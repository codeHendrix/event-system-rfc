import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { tabsBroadcast } from './events/events.ts';

window.addEventListener('beforeunload', () => {
  console.log('before unload called, destorying tabs broadcast');
  tabsBroadcast.destroy();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
