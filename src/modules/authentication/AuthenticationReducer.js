import {
  IS_AUTHENTICATING,
  UPDATE_AUTHORIZATION_STATE
} from './AuthenticationTypes'

export const initial = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  isAuthenticating: false
}

export default (state = initial, action) => {
  switch (action.type) {
    case UPDATE_AUTHORIZATION_STATE:
      return { ...state, isAuthenticated: action.payload }
    case IS_AUTHENTICATING:
      return { ...state, isAuthenticating: action.payload }
    default:
      return state
  }
}
