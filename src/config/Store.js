import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import LikeDogsReducer from '../modules/like-dogs/LikeDogsReducer'
import ProfileWishlistReducer from '../modules/profile-wishlist/ProfileWishlistReducer'
import AuthenticationReducer from '../modules/authentication/AuthenticationReducer'

const appReducer = combineReducers({
  authentication: AuthenticationReducer,
  likeDogs: LikeDogsReducer,
  profileWishlist: ProfileWishlistReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default createStore(rootReducer, {}, applyMiddleware(thunk))
