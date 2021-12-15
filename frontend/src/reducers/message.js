export default function messageReducer (state = {success: false, error: false}, action) {
  switch(action.type) {
    case 'SUCCESS':
      return {success: action.payload}
    case 'ERROR':
      return {error: action.payload}
    default:
      return state
  }
}

export const success = (message) => {
  return {
    type: 'SUCCESS',
    payload: message
  }
}

export const error = (message) => {
  return {
    type: 'ERROR',
    payload: message
  }
}