import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import LikeDogsReducer from '../modules/like-dogs/LikeDogsReducer'
import AuthenticationReducer from '../modules/authentication/AuthenticationReducer'

const appReducer = combineReducers({
  authorization: AuthenticationReducer,
  likeDogs: LikeDogsReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default createStore(rootReducer, {}, applyMiddleware(thunk))
