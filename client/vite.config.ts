import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/dist',
  },
  base: '/my-project/',
});

// export default defineConfig({
//   ...
//   build: {
//       outDir: '../server/dist'
//   },
//   base: '/',
//   ...
// });
