import actionType from './actionTypes';
import initialState from './initialState';

const customMiddleWare = (store) => (next) => (action) => {
  // Custom Middleware
  // ...

  return next(action);
};




const reducer = (state = initialState, action) => {
  
  // function used in UPDATE_FIND_SUBSCRIBER_JOB_SUCCESS action
  function updateObjectInArray(array, action) {
    return array.map( item => {
      // if the item's id in the array is not equal to the id of the object returned by the action - return as is
      if (item.id != action.payload.job.id) {
        return item
      }
      
      // otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...action.payload.job
      }
    })
  }
  
  switch (action.type) {
    case actionType.INPUT_CHANGE:
      return {
        ...state,
        input: action.payload.input
      };

    case actionType.FIND_SUBSCRIBER_REQUEST:
      return {
        ...state,
        resultLoading: action.payload.resultLoading,
        resultRetrieved: action.payload.resultRetrieved,
        inputSubmitted: action.payload.inputSubmitted,
        error: action.payload.error
      };
    case actionType.FIND_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        currentJobId: action.payload.currentJobId,
        findSubscriberJobs: [...state.findSubscriberJobs, action.payload.job]
      };
    case actionType.FIND_SUBSCRIBER_FAILURE:
      return {
        ...state,
        resultLoading: action.payload.resultLoading,
        resultRetrieved: action.payload.resultRetrieved,
        error: action.payload.error
      };
    case actionType.UPDATE_FIND_SUBSCRIBER_CURRENT_JOB_SUCCESS:
      return {
        ...state,
        findSubscriberJobs: updateObjectInArray(state.findSubscriberJobs, action),
        resultLoading: action.payload.resultLoading,
        resultRetrieved: action.payload.resultRetrieved
      }
    case actionType.UPDATE_FIND_SUBSCRIBER_OTHER_JOB_SUCCESS:
      return {
        ...state,
        findSubscriberJobs: updateObjectInArray(state.findSubscriberJobs, action)
      }
    case actionType.UPDATE_FIND_SUBSCRIBER_JOB_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }
    
    default:
      return state;
  }
};

export { customMiddleWare, reducer };
