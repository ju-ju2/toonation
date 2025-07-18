import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { worker } from './api/mocks/browser.ts';
import App from './App.tsx';

import './index.scss';
import './toonation.variables.scss';

const isMock = true;

if (isMock) {
  worker.start().then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
} else {
  // 프로덕션에서 워커 없이 실행
  createRoot(document.getElementById('root')!).render(
    <div>
      <App />
    </div>
  );
}
