import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import LikeDogsReducer from '../modules/like-dogs/LikeDogsReducer'

const appReducer = combineReducers({
  likeDogs: LikeDogsReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default createStore(rootReducer, {}, applyMiddleware(thunk))
