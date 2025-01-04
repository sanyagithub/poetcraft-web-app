const express = require('express');
const router = express.Router();
const axios = require('axios'); // You'll need to install axios

const API_KEY = "1x0kt57et8l3giiatucnrkwqru9qcb144880psu13cw3064rk";

router.get('/:word', async (req, res) => {
    try {
        const word = req.params.word;
        const url = `https://api.wordnik.com/v4/word.json/${word}/hyphenation?useCanonical=true&limit=50&api_key=${API_KEY}`;

        const response = await axios.get(url);
        const data = response.data;

        const finalArray = data.map(item => ({
            syllable: item.text,
            type: item.type ? (
                item.type === "stress" ? "primary" :
                    item.type === "secondary stress" ? "secondary" :
                        "unstressed"
            ) : "unstressed"
        }));

        res.json(finalArray);
    } catch (error) {
        console.error('Error fetching word stress:', error);
        res.status(500).json({ error: 'Failed to fetch word stress pattern' });
    }
});

module.exports = router;
