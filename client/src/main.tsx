import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Service Worker: Only register in production, unregister in development
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    // Production: Register service worker for PWA functionality
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    });
  } else {
    // Development: Unregister any existing service workers to allow hot reload
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.log('Service Worker unregistered for development');
      });
    });
  }
}

createRoot(document.getElementById("root")!).render(<App />);
