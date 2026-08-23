import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json' with { type: 'json' };

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    // Popup pages don't benefit from modulepreload, and the injected <link>
    // tags collide with content-script chunks flagged as web-accessible
    // resources ("cross-world extension resource mismatch" warning).
    modulePreload: false,
  },
});
