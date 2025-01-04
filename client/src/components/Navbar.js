import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style/Navbar.css";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/" className="logo-link">
                    <h1>PoetCraft</h1>
                    <span className="logo-subtitle">Poetry Learning Made Easy</span>
                    <div className="expert-credit">Designed with the expertise of Annie Finch</div>
                </Link>
            </div>
            <div className="nav-help">
                <button className="help-button">
                    Need Help? Click Here
                </button>
            </div>
            <ul className="nav-links">
                {[
                    { path: "/", label: "Home" },
                    { path: "/module", label: "Poetry Lessons" },
                    { path: "/login", label: "Sign In" },
                ].map(({ path, label }) => (
                    <li key={path}>
                        <Link
                            to={path}
                            className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                            aria-current={location.pathname === path ? 'page' : undefined}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar
