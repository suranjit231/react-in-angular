import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add a render method for Angular integration
window.renderReactApp2 = (containerId = 'root2') => {
  const rootElement = document.getElementById(containerId);
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

// For standalone React development
if (!window.angularMount) {
  const root = ReactDOM.createRoot(document.getElementById('root2')); // Changed from 'root' to 'root2'
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}