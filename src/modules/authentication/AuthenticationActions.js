
import AuthenticationService from '../../services/authentication/AuthenticationService'
import {
  IS_AUTHENTICATING,
  UPDATE_AUTHORIZATION_STATE,
  SIGNIN_ERROR,
  SIGNUP_ERROR
} from './AuthenticationTypes'
import { Redirect } from 'react-router'

export const updateAuthorizationState = (isAuthenticated) => ({
  type: UPDATE_AUTHORIZATION_STATE,
  payload: isAuthenticated,
})

export const isAuthenticating = (isAuthenticating) => ({
  type: IS_AUTHENTICATING,
  payload: isAuthenticating,
})

export const updateSignInError = (authError) => ({
  type: SIGNIN_ERROR,
  payload: authError,
})

export const updateSignUpError = (authError) => ({
  type: SIGNUP_ERROR,
  payload: authError,
})

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(isAuthenticating(true))

    new AuthenticationService().signIn(email, password)
    .then((snapshot) => {
      dispatch(isAuthenticating(false))
      dispatch(updateAuthorizationState(true))

    })
    .catch((error) => {
      dispatch(isAuthenticating(false))
      dispatch(updateSignInError(error.message))
    });

  }
}

export const signUp = (username, email, password) => {
  return (dispatch) => {
    dispatch(isAuthenticating(true))
    new AuthenticationService().signUp(username, email, password)
    .then(() => {
        dispatch(isAuthenticating(false))
        dispatch(updateAuthorizationState(true))
    })
    .catch((error) => {
      dispatch(isAuthenticating(false))
      dispatch(updateSignUpError(error.message))
    });
  }
}

export const signOut = () => {
  return (dispatch) => {
    new AuthenticationService().signOut().then((snapshot) => {
      dispatch(isAuthenticating(false))
      dispatch(updateAuthorizationState(false))
    }).catch((error) => {
      dispatch(isAuthenticating(false))
    });
  }
}