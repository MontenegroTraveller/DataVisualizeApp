const Html = ({ body }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="/css/main.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1 minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <meta property="og:type" content="website" />
      <meta name="og:title" content="Tall&Round" />
      <meta name="og:description" content="Analitics for humans capital" />
      <script src="/fonts/all.js"></script>
    </head>
    <body>
      <div id="root">${body}</div>
      <script type="text/javascript" src="/js/bundle.js?v=COMMITHASH"></script>
    </body>
  </html>
`
}

export default Html
