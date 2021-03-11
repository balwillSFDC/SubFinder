// setup inspired by github.com/node-workers-example/worker.js
const throng = require('throng')
const Queue = require('bull')
const { findSubscriber } = require('./sfmcHelper');

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379"

let workers = process.env.WEB_CONCURRENCY || 2

let maxJobsPerWorker = 50

function start() {
  let workQueue = new Queue('work', REDIS_URL)

  workQueue.process(maxJobsPerWorker, async (job) => {
    console.log(job.toJSON())

    switch(job.data.jobType) {
      case 'FIND_SUBSCRIBER':
        let findSubscriberResult = await findSubscriber(job.data.inputSubmitted)
        return findSubscriberResult
    }
  })
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start })

