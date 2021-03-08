import actionType from './actionTypes'

const initialState = {
  input: '',
  inputSubmitted: '',
  resultLoading: false,
  resultRetrieved: false,
  results: null,
  error: {},
}

const customMiddleWare = store => next => action => {
  // Custom Middleware
  // ...


  return next(action)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INPUT_CHANGE:
      return {
        ...state,
        input: action.payload.input
      }

    case actionType.FIND_SUBSCRIBER_REQUEST:
      return {
        ...state,
        resultLoading: action.payload.resultLoading,
        resultRetrieved: action.payload.resultRetrieved,
        inputSubmitted: action.payload.inputSubmitted,
        error: action.payload.error
      }
    case actionType.FIND_SUBSCRIBER_SUCCESS: 
      return {
        ...state,
        resultLoading: action.payload.resultLoading,
        resultRetrieved: action.payload.resultRetrieved,
        results: action.payload.results
      }
    case actionType.FIND_SUBSCRIBER_FAILURE:
      return {
        ...state,
        resultLoading: action.payload.resultLoading,
        resultRetrieved: action.payload.resultRetrieved,
        error: action.payload.error
      }
    default:
      return state;
  }

};

export {customMiddleWare, reducer}