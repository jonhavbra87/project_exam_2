/**
 * @fileoverview Application entry point that renders the root React component
 * @module index
 */

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import ScrollToTop from './utilities/ScrollToTop/index.tsx';

/**
 * Renders the root React component to the DOM
 *
 * This is the entry point of the application that:
 * 1. Creates a root using ReactDOM's createRoot API
 * 2. Wraps the application in StrictMode for development checks
 * 3. Provides routing capabilities with BrowserRouter
 * 4. Includes ScrollToTop utility to scroll to top on navigation
 * 5. Renders the main App component
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
);
