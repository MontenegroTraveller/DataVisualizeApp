module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage', // or "entry"
        corejs: 3,
        targets: {
          browsers: '> 0.25%, not dead'
        },
        loose: true
      }
    ],
    '@babel/react'
  ],

  plugins: (process.env.NODE_ENV === 'development'
    ? ['react-hot-loader/babel', 'react-refresh/babel']
    : []
  ).concat([
    '@emotion',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/transform-runtime',
      {
        corejs: 3
      }
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'css-modules-transform',
      {
        extensions: ['.styl', '.css', '.scss']
      }
    ]
  ])
}
