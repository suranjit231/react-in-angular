
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

window.mountReactApp = (containerId, props) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  const root = ReactDOM.createRoot(container);
  root.render(<App {...props} />);
  return root;
};

// if (document.getElementById('root')) {
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<App />);
// }
