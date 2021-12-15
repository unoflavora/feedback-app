import server from '../utils/feedbackUtils'
import jwt_decode from "jwt-decode";

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET USER':
      return action.payload
    default:
      return state
  }
}

//As there is no login, a login event is simulated here.
const getInitialUserAction = (user) => {
  return {
    type: 'GET USER', 
    payload: user
  }
}

export const getInitialUser = () => {
  return async dispatch =>{
    let token = await server.getToken()
    const user = jwt_decode(token)
    dispatch(getInitialUserAction(user))
  }
}

export default userReducer