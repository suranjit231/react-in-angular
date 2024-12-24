// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Expose App component with proper props handling
window.App = {
  A: (props) => {
    console.log("Props in wrapper component:", props);
    return React.createElement(App, props);
  }
};

// This rendering is only for development mode
if (document.getElementById('root')) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}