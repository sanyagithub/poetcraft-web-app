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

        const pronunciation = cmuDict[word][0]; // Get first pronunciation if multiple exist

        const syllableBoundaries = [];
        let currentStart = 0;

        for (let i = 0; i < pronunciation.length; i++) {
            if (pronunciation[i].match(/[0-2]$/)) {
                syllableBoundaries.push({
                    start: currentStart,
                    end: i + 1,
                    stress: pronunciation[i].slice(-1)
                });
                currentStart = i + 1;
            }
        }



        // Calculate approximate positions in original word
        const wordLength = word.length;
        const result = [];

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

            result.push({
                syllable: syllable,
                type: stressType
            });
        });


        res.json(result);

    } catch (error) {
        console.error('Error processing word stress:', error);
        res.status(500).json({ error: 'Failed to process word stress pattern' });
    }
});

module.exports = router;
