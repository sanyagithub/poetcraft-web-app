// routes/syllables.js
const express = require('express');
const router = express.Router();

const fsp = require('fs').promises;   // async fs
const fs = require('fs');             // sync fs (existsSync, mkdirSync)
const path = require('path');

// --- Hyphenation lib (Hypher) — SYNC
const Hypher = require('hypher');
const english = require('hyphenation.en-us');
const H = new Hypher(english);

// --- CMU helpers
const VOWEL_PHONE_RE = /[0-2]$/;
const STRESS2TYPE = { '0': 'unstressed', '1': 'primary', '2': 'secondary' };

// --- Consonant digraphs we never cut through
const DIGRAPHS = new Set(['ch','sh','th','ph','wh','ck','ng','gh','qu']);

// --- Common compound roots (expanded; tweak as you like)
const COMMON_COMPOUND_ROOTS = [
    // spatial / simple verbs
    'back','front','side','top','bottom','left','right','up','down','in','out','off','on','over','under','after','before','fore','mid','cross','through','into','onto',
    // time & measure
    'day','night','noon','time','week','month','year','hour','quarter',
    // people / roles
    'man','woman','boy','girl','child','kid','self','people','person','friend',
    // generic thing-words
    'thing','one','body','place','line','board','work','room','way','land','ground','house','home','yard','field','ship','craft','boat','car','cycle','drive','road','fare','port','store',
    // common bases
    'hand','head','foot','snow','rain','sun','moon','star','fire','water','wind','stone','wood','metal','steel','iron','gold','silver','glass','paper','book','note','card','mark','list','light','dark','coat',
    // sense & speech
    'sound','speech','word','song','story','letter','phone','news',
    // tech-ish
    'mail','ware','data','base','case','code','bit','byte',
    // free morphemes
    'ever','where','some','any','every','no','most','least',
    // colors
    'black','white','red','blue','green','brown','yellow','orange','purple','pink','gray',
    // animals (frequent compounds)
    'horse','dog','cat','bird','fish','fly','bug','bee',
    // school & office
    'class','mate','home','school','office','board',
    // body-related
    'hip','arm','leg','heart','blood',
    // nature/geography
    'sea','lake','river','mountain','hill','forest','soil','earth','sky',
    // misc
    'door','bell','lock','key','wheel','chair','table','bed','sheet','town','stairs','flower','bow','quake','cut','work'
];

// --- tiny cache so we don’t re-hyphenate the same word constantly
const HYPH_CACHE = new Map();
function hyphenateWord(word) {
    const w = word.toLowerCase();
    if (HYPH_CACHE.has(w)) return HYPH_CACHE.get(w);
    // Hypher returns an array of chunks already (e.g., ["back","ground"])
    const parts = H.hyphenate(w);
    if (HYPH_CACHE.size > 5000) HYPH_CACHE.delete(HYPH_CACHE.keys().next().value);
    HYPH_CACHE.set(w, parts);
    return parts;
}

// --- Stress from CMU (authoritative)
function stressTypesFromPron(pron) {
    const types = [];
    for (const p of pron) if (VOWEL_PHONE_RE.test(p)) types.push(STRESS2TYPE[p.slice(-1)]);
    if (!types.length) types.push('unstressed');
    return types;
}

// --- Digraph guard helpers
function isDigraphAt(word, cutIndexMinus1) {
    const w = word.toLowerCase();
    if (cutIndexMinus1 < 0 || cutIndexMinus1 + 1 >= w.length) return false;
    return DIGRAPHS.has(w.slice(cutIndexMinus1, cutIndexMinus1 + 2));
}
function avoidDigraphSplit(word, cut) {
    if (isDigraphAt(word, cut - 1)) {
        if (!isDigraphAt(word, cut)) return cut + 1;      // nudge right
        if (!isDigraphAt(word, cut - 2)) return cut - 1;  // or left
    }
    return cut;
}

// --- Compound detection (root + root at start; e.g., back|ground)
function proposeCompoundCut(word) {
    const w = word.toLowerCase();
    for (const A of COMMON_COMPOUND_ROOTS) {
        if (!w.startsWith(A) || A.length >= w.length - 1) continue;
        const rest = w.slice(A.length);
        for (const B of COMMON_COMPOUND_ROOTS) {
            if (B && rest.startsWith(B)) return A.length; // strong boundary
        }
    }
    return null;
}

// --- Reconcile hyphenation with target CMU syllable count
function reconcileToCount(word, initialParts, targetCount) {
    if (targetCount <= 1) return [word];

    const L = word.length;

    // start from library cuts
    const cuts = new Set();
    let idx = 0;
    for (let i = 0; i < initialParts.length - 1; i++) {
        idx += initialParts[i].length;
        cuts.add(idx);
    }

    // add strong compound cut if present
    const compCut = proposeCompoundCut(word);
    if (compCut && compCut > 0 && compCut < L) cuts.add(compCut);

    // add more cuts until we reach count-1, splitting the largest span each time
    while (cuts.size < targetCount - 1) {
        const sorted = Array.from(cuts).sort((a,b)=>a-b);
        const spans = [0, ...sorted, L];
        let maxLen = -1, left = 0, right = 0;
        for (let i = 0; i < spans.length - 1; i++) {
            const len = spans[i + 1] - spans[i];
            if (len > maxLen) { maxLen = len; left = spans[i]; right = spans[i + 1]; }
        }
        let mid = Math.floor((left + right) / 2);
        mid = Math.max(1, Math.min(L - 1, mid));
        mid = avoidDigraphSplit(word, mid);
        cuts.add(mid);
        if (cuts.size > 1000) break; // guardrail
    }

    // if too many cuts, merge the smallest span by removing the nearest boundary
    while (cuts.size > targetCount - 1) {
        const sorted = Array.from(cuts).sort((a,b)=>a-b);
        const spans = [0, ...sorted, L];
        let minLen = Infinity, removeAt = null;
        for (let i = 0; i < spans.length - 1; i++) {
            const len = spans[i + 1] - spans[i];
            if (len < minLen) {
                minLen = len;
                removeAt = (i < sorted.length) ? sorted[i] : sorted[i - 1];
            }
        }
        if (removeAt == null) break;
        cuts.delete(removeAt);
    }

    // build parts
    const finalCuts = Array.from(cuts).sort((a,b)=>a-b);
    const out = [];
    let prev = 0;
    for (const c of finalCuts) { out.push(word.slice(prev, c)); prev = c; }
    out.push(word.slice(prev));
    return out;
}

/* ================================
   Route
   ================================ */

router.get('/:word', async (req, res) => {
    try {
        const raw = (req.params.word || '').trim();
        const key = raw.toLowerCase(); // CMU keys are lowercase
        console.log(`Processing word: ${raw}`);

        const cmuDict = JSON.parse(
            await fsp.readFile(path.join(__dirname, '../cmudict/cmudict.json'), 'utf8')
        );

        const pronunciations = cmuDict[key];
        if (!pronunciations) {
            return res.status(404).json({ error: 'Word not found in dictionary' });
        }

        const stressPatternMap = new Map();

        for (const pronunciation of pronunciations) {
            // 1) stress (CMU truth)
            const stressTypes = stressTypesFromPron(pronunciation);
            const nSyll = stressTypes.length;

            // 2) hyphenation (sync) → reconcile to CMU syllable count
            const hyphParts = hyphenateWord(key);           // e.g., ["back","ground"]
            const letterChunks = reconcileToCount(key, hyphParts, nSyll);

            // 3) pair chunks with stress
            const syllables = letterChunks.map((chunk, i) => ({
                syllable: chunk,
                type: stressTypes[i] || 'unstressed'
            }));

            const stressPattern = stressTypes.join('-');
            if (!stressPatternMap.has(stressPattern)) {
                stressPatternMap.set(stressPattern, {
                    id: stressPatternMap.size + 1,
                    syllables,
                    rawPhonemes: [pronunciation],
                    count: 1
                });
            } else {
                const entry = stressPatternMap.get(stressPattern);
                entry.rawPhonemes.push(pronunciation);
                entry.count++;
            }
        }

        res.json(Array.from(stressPatternMap.values()));
    } catch (error) {
        console.error('Error processing word stress:', error);
        res.status(500).json({ error: 'Failed to process word stress pattern' });
    }
});

/* ================================
   Simple file-based storage for NPS feedback
   ================================ */
const NPS_DATA_FILE = path.join(__dirname, '../data/nps-feedback.json');

const ensureDataDirExists = () => {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(NPS_DATA_FILE)) {
        fs.writeFileSync(NPS_DATA_FILE, JSON.stringify([]));
    }
};

module.exports = router;
