
import AuthenticationService from '../../services/authentication/AuthenticationService'
import {
  IS_AUTHENTICATING,
  UPDATE_AUTHORIZATION_STATE
} from './AuthenticationTypes'

export const updateAuthorizationState = (isAuthenticated) => ({
  type: UPDATE_AUTHORIZATION_STATE,
  payload: isAuthenticated,
})

export const isAuthenticating = (isAuthenticating) => ({
  type: IS_AUTHENTICATING,
  payload: isAuthenticating,
})

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(isAuthenticating(true))

    new AuthenticationService().signIn(email, password)
    .then((snapshot) => {
      console.log('auth success')
      localStorage.setItem('id_token', 'user.id_token321321321')
      localStorage.setItem('id_token', 'user.access_token3213213')

      // localStorage.removeItem('id_token')
      // localStorage.removeItem('access_token')
      dispatch(isAuthenticating(false))
      dispatch(updateAuthorizationState(true))
    })
    .catch((error) => {
      dispatch(isAuthenticating(false))
      console.log('auth error', error)
    });

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