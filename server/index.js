if (typeof window === 'undefined') {
    global.window = {}
}
const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../build/react-server')
// const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
// const data = require('./data.json');

const server = (port) => {
  const app = express()

  app.use(express.static('build'))
  app.get('/react', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('Server is running on port:' + port)
  })
}

server(process.env.PORT || 3000)

const renderMarkup = (str) => {
  // const dataStr = JSON.stringify(data);
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id='root'> ${str}</div>
    </body>
    </html>`
}
