import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Gracefully handle expected benign Vite HMR WebSocket disconnect messages in container preview
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reasonMsg = event.reason?.message || (typeof event.reason === 'string' ? event.reason : '');
    if (
      reasonMsg.includes('WebSocket closed without opened') ||
      reasonMsg.includes('failed to connect to websocket') ||
      reasonMsg.includes('[vite]')
    ) {
      event.preventDefault();
    }
  });
}

// Register PWA Service Worker for app installability and offline support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('Sky Prep Service Worker registered successfully:', reg.scope);
      })
      .catch((err) => {
        console.warn('Service Worker registration failed:', err);
      });
  });
} else if ('serviceWorker' in navigator) {
  // In development / preview, still register to test PWA install prompt criteria
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('Sky Prep Service Worker ready:', reg.scope);
      })
      .catch((err) => {
        console.warn('Service Worker init:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

