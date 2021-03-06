import axios from 'axios'
import actionType from './actionTypes'

// KEEPING AS A MODEL - DELETE LATER
// export const fetchAuthCode = () => {
//   return async (dispatch, getState) => {
//     // Tell the app we're fetching auth code
//     dispatch({
//       type: 'FETCH_AUTHORIZATION_CODE_REQUEST'
//     })

//     // Try and fetch the Authorization Code
//     try {  
//       let response = await axios.get('/api/authcode')
//       // Tell the App we've successfully retrieve auth code
//       dispatch({
//         type: 'FETCH_AUTHORIZATION_CODE_SUCCESS',
//         payload: {
//           authCodeLogin: response.data  
//         }
//       })
//     } 
//     // Tell the App auth code retrieval failed 
//     catch (error) {
//       dispatch({
//         type: 'FETCH_AUTHORIZATION_CODE_ERROR'
//       })
//     }
//   }
// }

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

// export function handleSubmit() {
//   return (dispatch, getState) => {
//     dispatch({
//       type: actionType.FORM_SUBMIT,
//       payload: {
//         resultLoading: true,
//         inputSubmitted: getState().input
//       }
//     })
//   }
// }