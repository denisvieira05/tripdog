
import AuthenticationService from '../../services/authentication/AuthenticationService'
import {
  IS_AUTHENTICATING,
  UPDATE_AUTHORIZATION_STATE
} from './AuthenticationTypes'

export const updateAuthorizationState = (authState) => ({
  type: UPDATE_AUTHORIZATION_STATE,
  payload: authState,
})

export const isAuthenticating = (isAuthenticating) => ({
  type: IS_AUTHENTICATING,
  payload: isAuthenticating,
})

export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch(isAuthenticating(true))

    const credentials = { email, password }

    await new AuthenticationService().signIn(credentials)

    dispatch(isAuthenticating(false))
    dispatch(updateAuthorizationState(true))
  }
}

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    dispatch(isAuthenticating(true))

    const credentials = { name, email, password }

    await new AuthenticationService().signUp(credentials)

    dispatch(isAuthenticating(true))
    dispatch(updateAuthorizationState(true))
  }
}

export const signOut = () => {
  return async (dispatch) => {
    await new AuthenticationService().signOut()
    dispatch(updateAuthorizationState(false))
  }
}