import { Link } from "react-router-dom"
import "./style/ModulesList.css"
import React from "react";

function ModulesList() {
    // Module data
    const modules = [
        {
            id: 1,
            title: "How to Scan a Poem in Meter",
            description: "Discover the heartbeat of poetry and build your foundation in metrical analysis",
            path: "/videolessons",
            icon: "heartbeat",
            image: "/annie-1.png",
            element: "base",
            rhythm: " ",
            lessons: [
                { id: 1, title: "What is a poem to you?" },
                { id: 2, title: "How many heartbeats do you feel each time you breathe in or out ?" },
                { id: 3, title: "What do you think are beats?" },
                { id: 4, title: "What is the next syllable that gets a beat?" },
                { id: 5, title: "What symbols do we use to mark the stronger syllables?" },
                { id: 6, title: "Write down the syllables with the strong accents..." },
                { id: 7, title: "How are these syllables you marked different from the other syllables?" },
                { id: 8, title: "What are the 3 things that make stressed syllables different from the unstressed syllables?" },
                { id: 9, title: "What are the syllables that get a cup? " },
                { id: 10, title: "Where will we mark the next edge?" },
                { id: 11, title: "What was the final pattern in the poem?" },
            ],
        },
        {
            id: 2,
            title: "Learn to Mistress Anapestic Meter",
            path: "/anapestic-meter",
            description: "Harness the dancing rhythms of the Meter of Fire",
            icon: "fire",
            element: "fire",
            image: "/annie-2.png",
            rhythm: "u u /", /* anapest */
            lessons: [
                { id: 12, title: "Introduction to Meter of Fire" },
                { id: 13, title: "I would live in your love" },
                { id: 14, title: "The Destruction of Sennacherib" },
                { id: 15, title: "Writing in anapestic meter" },
                { id: 16, title: "Fixing Meter In Poems" },
            ],
        },
        {
            id: 3,
            title: "Learn to Mistress Iambic Meter",
            description: "Explore the flowing Meter of Air",
            path: "/iambic-meter",
            icon: "air",
            element: "air",
            image: "/annie-3.png",
            rhythm: "u /", /* iamb */
            lessons: [
                { id: 17, title: "Introduction to Meter of Air" },
                { id: 18, title: "Revision of Process of Scansion" },
                { id: 19, title: "Significance of Variations In Meter" },
                { id: 20, title: "Ghost Cups" },
                { id: 21, title: "The Metrical Contract" },
                { id: 22, title: "Origin of the word 'meter'" },
                { id: 23, title: "Importance of Diversity in Meter" },
                { id: 24, title: "When did Iambic become predominant in English" },
            ],
        },
        {
            id: 4,
            title: "Learn to Mistress Trochaic Meter",
            description: "Ground your poetry in the solid Meter of Earth",
            path: "/trochaic-meter",
            icon: "earth",
            image: "/annie-4.png",
            element: "earth",
            rhythm: "/ u", /* trochee */
            lessons: [
                { id: 25, title: "Revision of Definitions" },
                { id: 26, title: "Revision of Scansion" },
                { id: 27, title: "Variations in Trochee Meter" },
                { id: 28, title: "The Language of Meter" },
                { id: 29, title: "Reading some poems in Trochee Meter" },
                { id: 30, title: "Why did poets choose trochee meter Part 1" },
                { id: 31, title: "Why did poets choose trochee meter Part 2" },
                { id: 32, title: "Power of Metrical Diversity" },
                { id: 33, title: "A Poet's Craft" },
            ],
        },
        {
            id: 5,
            title: "Learn to Mistress Dactylic Meter",
            description: "Immerse yourself in the fluid Meter of Water",
            path: "/dactylic-meter",
            icon: "water",
            element: "water",
            image: "/annie-6.png",
            rhythm: "/ u u", /* dactyl */
            lessons: [
                { id: 34, title: "Revision of Meter Definitions and Scansion" },
                { id: 35, title: "Scanning a Poem in Dactylic Meter Part 1" },
                { id: 36, title: "Levels of Stress" },
                { id: 37, title: "Scanning a Poem in Dactylic Meter Part 2" },
                { id: 38, title: "Meter of Heart" },
                { id: 39, title: "Scanning a Poem in Dactylic Meter Part 3" },
                { id: 41, title: "Reading a Poem in Dactylic Meter" },
                { id: 42, title: "Scan another line together" },
                { id: 43, title: "Healing using Meter Part 1" },
                { id: 44, title: "Healing using Meter Part 2" },
            ],
        },
    ]

    return (
        <div className="modules-container">
            <header className="modules-header">
                <h1>Learn to Mistress Meter in Poetry</h1>
                <div className="header-decoration">
                    <span className="rhythm-pattern">/ u / u / u / u /</span>
                </div>
            </header>

            <div className="modules-grid">
                {modules.map((module) => (
                    <div key={module.id} className="module-card">
                        <div className={`module-card-header ${module.element}`}>
                            <div className="element-icon">
                                {module.icon === "heartbeat" && <span className="pulse-icon">♥</span>}
                                {module.icon === "fire" && <span className="fire-icon">🔥</span>}
                                {module.icon === "air" && <span className="air-icon">🌬️</span>}
                                {module.icon === "earth" && <span className="earth-icon">🌱</span>}
                                {module.icon === "water" && <span className="water-icon">💧</span>}
                            </div>
                            <h2>{module.title}</h2>
                            {module.rhythm && (
                                <div className="rhythm-indicator">
                                    <span className="rhythm-pattern">{module.rhythm}</span>
                                </div>
                            )}
                            <p className="module-description">{module.description}</p>
                        </div>
                        <div className="image-container-module">
                            <img
                                src={module.image}
                                alt="Annie Finch"
                                className="annie-images"
                            />
                        </div>
                        <div className="module-card-content">
                            <div className="lesson-count">
                                <span className="lesson-icon">📚</span>
                                <span>{module.lessons.length} lessons</span>
                            </div>
                            <ul className="lesson-preview">
                                {module.lessons.slice(0, 3).map((lesson) => (
                                    <li key={lesson.id}>• {lesson.title}</li>
                                ))}
                                {module.lessons.length > 3 && <li>• And {module.lessons.length - 3} more...</li>}
                            </ul>
                        </div>
                        <div className="module-card-footer">
                            <Link to={module.path} className="view-module-button">
                                View Module
                                <span className="arrow-icon">→</span>
                            </Link>
                        </div>
                        <div className="card-decoration"></div>
                    </div>
                ))}
            </div>
            <div className="page-decoration wave-bottom"></div>
        </div>
    )
}

export default ModulesList;
