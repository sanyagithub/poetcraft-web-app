import React from 'react';
import './style/Muse.css';

// Import all Muse images
import museReading from '../assets/muse-reading.png';
import museCool from '../assets/muse-skateboard.png';
import museWelcome from '../assets/muse-welcome.png';
import museWriting from '../assets/muse-writing.png';

const Muse = ({ type, message, className }) => {
    const getMuseImage = () => {
        switch(type) {
            case 'reading':
                return museReading;
            case 'cool':
                return museCool;
            case 'welcome':
                return museWelcome;
            case 'writing':
                return museWriting;
            default:
                return museWelcome;
        }
    };

    return (
        <div className={`muse-container ${className || ''}`}>
            <img
                src={getMuseImage()}
                alt={`Muse ${type}`}
                className="muse-image"
            />
            {message && <div className="muse-message">{message}</div>}
        </div>
    );
};

export default Muse;
