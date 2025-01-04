import React, { useState } from 'react';
import { Typography, Stack, Tooltip, Button } from '@mui/joy';

const Syllable = ({ text, onMarkChange }) => {
    const [isStressed, setIsStressed] = useState(null); // null: no marker, true: stressed, false: unstressed
    const [separator, setSeparator] = useState(' '); // Default separator is blank

    const toggleStress = () => {
        const newStress = isStressed === null ? true : !isStressed;
        setIsStressed(newStress);
        onMarkChange({ isStressed: newStress, separator });
    };

    const toggleSeparator = () => {
        const newSeparator = separator === ' ' ? '|' : ' ';
        setSeparator(newSeparator);
        onMarkChange({ isStressed, separator: newSeparator });
    };

    return (
        <span
            style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: '8px'
            }}
        >
            <Tooltip title={isStressed === true ? 'Stressed (click to remove stress)' : isStressed === false ? 'Unstressed (click to mark as stressed)' : 'Click to mark as stressed'}>
                <span
                    onClick={toggleStress}
                    aria-live="polite"
                    aria-label={isStressed === true ? 'Stressed syllable' : isStressed === false ? 'Unstressed syllable' : 'Mark syllable as stressed'}
                    style={{
                        fontSize: '0.85em',
                        height: '1em',
                        cursor: 'pointer',
                        color: isStressed === true ? '#1976d2' : isStressed === false ? '#777' : '#333',
                        backgroundColor: isStressed !== null ? '#e3f2fd' : 'transparent',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                >
                    {isStressed === true ? '/' : isStressed === false ? 'u' : '\u00A0'}
                </span>
            </Tooltip>

            <Tooltip title="Toggle separator">
                <span
                    onClick={toggleSeparator}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontWeight: isStressed === true ? 'bold' : 'normal',
                        color: isStressed === true ? '#1976d2' : '#333',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                    }}
                >
                    {text}
                    <span style={{ marginLeft: '4px', color: '#999', fontSize: '1.1em', fontWeight: 'bold' }}>{separator}</span>
                </span>
            </Tooltip>
        </span>
    );
};

const Line = ({ lineData, exampleMarking }) => {
    const [marking, setMarking] = useState(lineData.map(() => ({ isStressed: null, separator: ' ' })));

    const handleMarkChange = (index, mark) => {
        setMarking(prevMarking => {
            const newMarking = [...prevMarking];
            newMarking[index] = mark;
            return newMarking;
        });
    };

    const checkStress = () => {
        const correct = marking.every((mark, index) => mark.isStressed === exampleMarking[index].isStressed);
        alert(`Stress Check: ${correct ? 'Great job! All correct.' : 'Oops! Some syllables are marked incorrectly.'}`);
    };

    const checkSeparator = () => {
        const correct = marking.every((mark, index) => mark.separator === exampleMarking[index].separator);
        alert(`Feet Check: ${correct ? 'Perfect!' : 'There are some incorrect separators.'}`);
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '10px'}}>
            {lineData.map((syllable, index) => (
                <Syllable key={index} text={syllable} onMarkChange={(mark) => handleMarkChange(index, mark)}/>
            ))}
            <div style={{marginLeft: 'auto', display: 'flex', gap: '10px'}}>
                <Button onClick={checkStress} style={{height: '30px', fontSize: '0.8em', padding: '4px 8px'}}>Check
                    Stress</Button>
                <Button onClick={checkSeparator} style={{height: '30px', fontSize: '0.8em', padding: '4px 8px'}}>Check
                    Feet</Button>
            </div>
        </div>
    );
};

const Poem = () => {
    const lines = [
        ['Hands,', 'do', 'what', "you're", 'bid:'],
        ['Bring', 'the', 'balloon', 'of', 'the', 'mind,'],
        ['That', 'bel', 'lies', 'and', 'drags', 'in', 'the', 'wind,'],
        ['Into', 'its', 'nar', 'row', 'shed.']
    ];

    // Example answers for each line
    const exampleMarkings = [
        [{isStressed: false, separator: ' '}, {isStressed: true, separator: ' '}, {
            isStressed: false,
            separator: ' '
        }, {isStressed: true, separator: ' '}, {isStressed: true, separator: '|'}],
        [{isStressed: true, separator: ' '}, {isStressed: false, separator: ' '}, {isStressed: true, separator: ' ' }, { isStressed: false, separator: ' ' }, { isStressed: false, separator: ' ' }, { isStressed: true, separator: '|' }],
        [{ isStressed: true, separator: ' ' }, { isStressed: false, separator: ' ' }, { isStressed: true, separator: ' ' }, { isStressed: false, separator: ' ' }, { isStressed: true, separator: ' ' }, { isStressed: false, separator: ' ' }, { isStressed: false, separator: ' ' }, { isStressed: true, separator: '|' }],
        [{ isStressed: true, separator: ' ' }, { isStressed: false, separator: ' ' }, { isStressed: true, separator: ' ' }, { isStressed: false, separator: '|' }]
    ];

    return (
        <div style={{
            padding: '30px',
            maxWidth: '650px',
            margin: 'auto',
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
            <Typography level="body2" align="center" style={{ marginBottom: '15px', color: '#555', fontSize: '0.9em' }}>
                📘 Tap on syllables to mark stress (/) or toggle separation (|). Hover for details.
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px', color: '#444' }}>
                <Typography level="body2" style={{ marginRight: '10px' }}>Legend:</Typography>
                <Typography level="body2" style={{ marginRight: '10px' }}>/ = Stressed</Typography>
                <Typography level="body2" style={{ marginRight: '10px' }}>u = Unstressed</Typography>
                <Typography level="body2">| = Separator</Typography>
            </div>

            <Typography level="h2" align="center" style={{ fontWeight: 'bold', marginBottom: '5px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                The Balloon of the Mind
            </Typography>
            <Typography level="h4" align="center" style={{ fontStyle: 'italic', marginBottom: '20px', color: '#555' }}>
                W. B. Yeats
            </Typography>

            {lines.map((line, index) => (
                <Line key={index} lineData={line} exampleMarking={exampleMarkings[index]} />
            ))}

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
                <Typography level="body1" style={{ fontStyle: 'italic', fontSize: '0.9em', color: '#777' }}>
                    1919
                </Typography>
            </Stack>
        </div>
    );
};

export default Poem;
