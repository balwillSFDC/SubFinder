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

export const findSubscriber = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionType.FIND_SUBSCRIBER_REQUEST,
      payload: {
        resultLoading: true,
        resultRetrieved: false,
        inputSubmitted: getState().input
      }
    })

    try {
      let response = await axios.post('api/findSubscriber', {
        inputSubmitted: getState().input
      })

      dispatch({
        type: actionType.FIND_SUBSCRIBER_SUCCESS,
        payload: {
          resultLoading: false,
          resultRetrieved: true,
          results: response.data
        }
      })
    } catch(e) {
      
      dispatch({
        type: actionType.FIND_SUBSCRIBER_FAILURE,
        payload: {
          resultLoading: false,
          resultRetrieved: false,
          error: e
        }
      })
    }
  }
}
