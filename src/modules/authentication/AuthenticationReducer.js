import {
  IS_AUTHENTICATING,
  UPDATE_AUTHORIZATION_STATE,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
  UPDATE_LOGGED_USER
} from './AuthenticationTypes'
import {
  UID_LOCALSTORAGE_KEY,
  REFRESH_TOKEN_LOCALSTORAGE_KEY
} from '../../services/ApiDataSource'

const checkUserAuth = () => {
  return localStorage.getItem(UID_LOCALSTORAGE_KEY) && localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY) 
}

export const initial = {
  isAuthenticated: checkUserAuth() ? true : false,
  isAuthenticating: false,
  signInError: '',
  signUpError: '',
  loggedUser: null
}

export default (state = initial, action) => {
  switch (action.type) {
    case UPDATE_AUTHORIZATION_STATE:
      return { ...state, isAuthenticated: action.payload }
    case IS_AUTHENTICATING:
      return { ...state, isAuthenticating: action.payload }
    case SIGNIN_ERROR:
      return { ...state, signInError: action.payload }
    case SIGNUP_ERROR:
      return { ...state, signUpError: action.payload }
    case UPDATE_LOGGED_USER:
      return { ...state, loggedUser: action.payload }
    default:
      return state
  }
}
