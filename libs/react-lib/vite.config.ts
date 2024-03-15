import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/react-lib',

  plugins: [react(), nxViteTsPaths()],
  resolve: {
    alias: {
      '@polkadot/rpc-core/bundle.js': resolve(__dirname, 'node_modules/@polkadot/rpc-core/bundle.js')
    }
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build:{
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', '@types/react',"@reef-chain/ui-kit","@reef-chain/util-lib","@reef-chain/evm-provider","@polkadot/rpc-core"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'React',
        },
      },
    },
  },
  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/*/.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/react-lib',
      provider: 'v8',
    },
  },
});