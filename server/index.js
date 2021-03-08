const express             = require('express')
const path                = require('path')
const cluster             = require('cluster')
const numCPUs             = require('os').cpus().length
const https               = require('https')
const { readFileSync }    = require('fs')
const axios               = require('axios')
const env                 = require('dotenv').config()
const bodyParser          = require('body-parser')
const { findSubscriber }          = require('./sfmcHelper')
const throng = require('throng')
const WORKERS = process.env.WEB_CONCURRENCY || 1
const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.port || 5000

function start() {
  const app = express();
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Priority serve any static files
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

  // =======================================================
  // ROUTES
  // =======================================================
 
  app.post('/api/findSubscriber', (req, res) => {
    findSubscriber(req.body.inputSubmitted)
      .then(result => res.json(result))
  })

  // All remaining requests return the React app, so it can handle routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
  })

  // Creates Server using 'HTTPS' protocol
  // https.createServer({
  //   key: readFileSync('server.key'),
  //   cert: readFileSync('server.cert')
  // }, app)
  app.listen(PORT, () => {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  })
} 

throng({
  worker: start,
  count: WORKERS
}).catch(err => console.log(err))
