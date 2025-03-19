const express = require('express');
const router = express.Router();
const axios = require('axios'); // You'll need to install axios

const fs = require('fs').promises;
const path = require('path');


router.get('/:word', async (req, res) => {
    try {
        const word = req.params.word; // CMU dict uses uppercase

        // Read and parse CMU dictionary
        const cmuDict = JSON.parse(
            await fs.readFile(path.join(__dirname, '../cmudict/cmudict.json'), 'utf8')
        );

        if (!cmuDict[word]) {
            return res.status(404).json({ error: 'Word not found in dictionary' });
        }

        // Process all available pronunciations
        const pronunciations = cmuDict[word]
        const allResults = []
        const stressPatternMap = new Map()

        for (let i = 0; i < pronunciations.length; i++) {
            const pronunciation = pronunciations[i]
            const syllableBoundaries = []
            let currentStart = 0

            for (let j = 0; j < pronunciation.length; j++) {
                if (pronunciation[j].match(/[0-2]$/)) {
                    syllableBoundaries.push({
                        start: currentStart,
                        end: j + 1,
                        stress: pronunciation[j].slice(-1),
                    })
                    currentStart = j + 1
                }
            }


            // Calculate approximate positions in original word
            const wordLength = word.length;
            const syllables = [];


            syllableBoundaries.forEach((boundary, index) => {
                const isLastSyllable = index === syllableBoundaries.length - 1;
                const approximateStart = Math.floor((boundary.start / pronunciation.length) * wordLength);
                const approximateEnd = isLastSyllable ?
                    wordLength :
                    Math.floor((syllableBoundaries[index + 1].start / pronunciation.length) * wordLength);

                // Get the actual syllable from the original word
                const syllable = word.slice(approximateStart, approximateEnd);

                const stressType = {
                    '0': 'unstressed',
                    '1': 'primary',
                    '2': 'secondary'
                }[boundary.stress];

                syllables.push({
                    syllable: syllable,
                    type: stressType
                });
            });

            // Generate a unique key for this stress pattern
            const stressPattern = syllables.map((s) => s.type).join("-")

            // If we haven't seen this stress pattern before, create a new entry
            if (!stressPatternMap.has(stressPattern)) {
                stressPatternMap.set(stressPattern, {
                    id: stressPatternMap.size + 1, // Assign sequential IDs
                    syllables: syllables,
                    rawPhonemes: [pronunciation], // Start an array of phoneme sets
                    count: 1, // Count how many pronunciations have this pattern
                })
            } else {
                // If we've seen this pattern, just add the phonemes to the existing entry
                const entry = stressPatternMap.get(stressPattern)
                entry.rawPhonemes.push(pronunciation)
                entry.count++
            }
        }

        // Convert the map to an array of results
        const results = Array.from(stressPatternMap.values())

        res.json(results)

    } catch (error) {
        console.error('Error processing word stress:', error);
        res.status(500).json({ error: 'Failed to process word stress pattern' });
    }
});

// Simple file-based storage for NPS feedback
const NPS_DATA_FILE = path.join(__dirname, '../data/nps-feedback.json');

// Ensure data directory exists
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
