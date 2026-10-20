export default [
  // 1. Node.js 端 (提供给 Cordis Loader 的空占位)
  {
    name: '@tpcowork/ui-brand-tpcowork/node',
    entry: { index: 'src/index.ts' },
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    fixedExtension: false,
    clean: false,
    dts: false,
  },
  // 2. 浏览器端 (提供给 DSH 客户端 __ModuleLoader__ 的运行时模块)
  {
    name: '@tpcowork/ui-brand-tpcowork/client',
    entry: { client: 'src/client/index.ts' },
    outDir: 'lib',
    format: ['cjs'],
    platform: 'browser',
    target: 'es2024',
    fixedExtension: false,
    outputOptions: {
      entryFileNames: 'client.js',
    },
    clean: false,
    dts: false,
    banner: {
      js: 'window.__ModuleLoader__.load({ id: "@tpcowork/ui-brand-tpcowork", factory: (require) => { var module = { exports: {} }; var exports = module.exports;',
    },
    footer: {
      js: 'return module.exports; } });',
    },
    external: [
      '@deepseek-ai/cordis',
      '@deepseek-ai/dsh-client-ui-renderer',
      '@deepseek-ai/dsh-client-ui-sidebar',
      '@deepseek-ai/dsh-client-ui-conversation',
      'react',
      'react/jsx-runtime',
      'react-dom',
    ],
  },
]
