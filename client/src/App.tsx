import React from "react";
import { AuthProvider } from './contexts/auth-context';
import "./App.css";

function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <div className="App">
                <Component {...pageProps} />
            </div>
        </AuthProvider>
    );
}

export default App;
