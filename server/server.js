/* eslint-disable import/no-duplicates */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import axios from 'axios'
import fs from 'fs'

import cookieParser from 'cookie-parser'
// import config from './config'
import Html from '../dist/assets/html'

let connections = []

const port = process.env.PORT || 3000
const server = express()

server.use(cors())

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

server.get('/api/v1/dataset/:datasetName', async (req, res) => {
  const fileName = `${__dirname}/tmp/data.json`
  return fs.readFile(fileName, async (err, data) => {
    if (!err) {
      return res.json(JSON.parse(data))
    }
    const { data: users } = await axios('https://akabab.github.io/superhero-api/api/all.json')
    return fs.writeFile(fileName, JSON.stringify(users), () => {
      return res.json(JSON.parse(users))
    })
  })

  // if (req && req.cookies && req.cookies.token) {
  //   try {
  //     const { data: dataset } = await axios.get(
  //       `${config.getDataSetUrl}/${req.params.datasetName}?q=${+new Date()}`,
  //       {
  //         headers: {
  //           Authorization: `Basic ${req.cookies.token}`
  //         }
  //       }
  //     )
  //     return res.json(dataset)
  //   } catch (e) {      console.log(e)

  //     return res.json([])
  //   }
  // }
  // return res.json([])
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const echo = sockjs.createServer()
echo.on('connection', (conn) => {
  connections.push(conn)
  conn.on('data', async () => {})

  conn.on('close', () => {
    connections = connections.filter((c) => c.readyState !== 3)
  })
})

server.get('/', async (req, res) => {
  // const body = renderToString(<Root />);
  const title = 'Server side Rendering'
  return res.send(
    Html({
      body: '',
      title
    })
  )
  // if (req && req.cookies && req.cookies.token) {
  //   return res.send(
  //     Html({
  //       body: '',
  //       title
  //     })
  //   )
  // }

  // return res.send(config.loginUrl)
})

server.get('/*', async (req, res) => {
  const initialState = {
    location: req.url
  }
  return res.send(
    Html({
      body: '',
      initialState
    })
  )

  // if (req && req.cookies && req.cookies.token) {
  //   const { data: body } = await axios.post(config.verifyTokenUrl, {
  //     token: req.cookies.token
  //   })
  //   if (body?.role === 'admin') {
  //     return res.send(
  //       Html({
  //         body: '',
  //         initialState
  //       })
  //     )
  //   }
  // }
  // return res.redirect(config.loginUrl)
})

const app = server.listen(port)

echo.installHandlers(app, { prefix: '/ws' })

// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
