import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Replace with your actual PayPal client ID
const SANDBOX_PAYPAL_CLIENT_ID = "ASLgY1mLuiQyTAII2PiLIkaaypJUqFgJnAd1fv4oAOd0jj771e5jpc_i8Lnpqw-D65bMse8uIE3U4HtH";
const PAYPAL_CLIENT_ID = "AbJzG2l7QstL6B-EriEhcpodI7yGLPKO2Bd3nqHn74alKJjrizQd9iEFfjjrT_gcNE--XZHQu805NZ6T";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PayPalScriptProvider
            options={{
                "client-id": SANDBOX_PAYPAL_CLIENT_ID,
                currency: "USD",
            }}
        >
            <App />
        </PayPalScriptProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
