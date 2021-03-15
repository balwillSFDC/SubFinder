import axios from 'axios'
import actionType from './actionTypes'

export function handleInput(e) {
  return {
    type: actionType.INPUT_CHANGE,
    payload: {
      input: e.target.value
    }
  }
}

export const addFindSubscriberJob = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionType.ADD_FIND_SUBSCRIBER_JOB_REQUEST,
      payload: {
        resultLoading: true,
        resultRetrieved: false,
        inputSubmitted: getState().input,
        error: {}
      }
    })

    // Make a post request to endpoint which adds request to a queue and returns job info
    try {
      let response = await axios.post('api/findSubscriberJob', {
        inputSubmitted: getState().input
      })

      dispatch({
        type: actionType.ADD_FIND_SUBSCRIBER_JOB_SUCCESS,
        payload: {
          currentJobId: response.data.id,
          job: {...response.data},
        }
      })
    } catch(e) {
      
      dispatch({
        type: actionType.ADD_FIND_SUBSCRIBER_JOB_FAILURE,
        payload: {
          resultLoading: false,
          resultRetrieved: false,
          error: e
        }
      })
    }
  }
}

export const updateFindSubscriberJobs = (incompleteJobs) => {
  return async (dispatch, getState) => {

    console.log('pulse')

    incompleteJobs.forEach(async incompleteJob => {
      try {
        let response = await axios.get(`api/findSubscriberJob/${incompleteJob.id}`)
        let retrievedJobState = response.data.state
        let currentJobId = getState().currentJobId


        if (retrievedJobState != incompleteJob.state ) {

          if (currentJobId === incompleteJob.id && retrievedJobState === 'completed') {
            dispatch({
              type: actionType.UPDATE_FIND_SUBSCRIBER_CURRENT_JOB_SUCCESS,
              payload: {
                job: response.data,
                resultLoading: false,
                resultRetrieved: true,
              }
            })
          } else if (currentJobId === incompleteJob.id && retrievedJobState === 'failed') {
            dispatch({
              type: actionType.UPDATE_FIND_SUBSCRIBER_CURRENT_JOB_FAILURE,
              payload: {
                job: response.data,
                resultLoading: false,
                resultRetrieved: true,
              }
            })

          } else if (currentJobId != incompleteJob.id && retrievedJobState != 'failed') {
            dispatch({
              type: actionType.UPDATE_FIND_SUBSCRIBER_OTHER_JOB_SUCCESS,
              payload: {
                job: response.data
              }
            })
          } else if (currentJobId != incompleteJob.id && retrievedJobState === 'failed') {
            dispatch({
              type:actionType.UPDATE_FIND_SUBSCRIBER_OTHER_JOB_FAILURE,
              payload: {
                job: response.data
              }
            })
          }

        }
        
      } catch(error) {
        dispatch({
          type: actionType.UPDATE_FIND_SUBSCRIBER_OTHER_JOB_FAILURE,
          payload: { error }
        })
      }
    })
  }
}
