import './event-manager.ts';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { fallbackRender } from './components/error-boundary-fallback.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ErrorBoundary fallbackRender={fallbackRender}>
    <App />
  </ErrorBoundary>
  // </StrictMode>
);
