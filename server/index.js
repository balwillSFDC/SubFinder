const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const { findSubscriber } = require('../sfmcHelper');
const WORKERS = process.env.WEB_CONCURRENCY || 2;
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
let Queue = require('bull');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

let workQueue = new Queue('work', REDIS_URL)

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// =======================================================
// ROUTES
// =======================================================

// Adds 'Find Subscriber' job to the work queue and returns back job info
app.post('/api/findSubscriberJob', async (req, res) => {
  let job = await workQueue.add({
    jobType: 'FIND_SUBSCRIBER',
    inputSubmitted: req.body.inputSubmitted
  })
  let dateTime = new Date(job.timestamp)
  
  res.json({
    id: job.id,
    timeSubmitted: dateTime,
    inputSubmitted: req.body.inputSubmitted,
    state: await job.getState()
  })
});

app.get('/api/findSubscriberJob/:id', async (req, res) => {
  let id = req.params.id 
  let job = await workQueue.getJob(id)

  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let result = job.returnvalue;
    let reason = job.failedReason;
    res.json({ id, state, progress, result, reason });
  }
})

// All remaining requests return the React app, so it can handle routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// Creates Server using 'HTTPS' protocol
// https.createServer({
//   key: readFileSync('server.key'),
//   cert: readFileSync('server.cert')
// }, app)
app.listen(PORT, () => {
  console.log(
    `Node ${
      isDev ? 'dev server' : 'cluster worker ' + process.pid
    }: listening on port ${PORT}`
  );
});

