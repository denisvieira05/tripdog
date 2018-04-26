import {
  UPDATE_MY_DOGS_WISHLIST,
  IS_FETCHING_MY_DOGS_WISHLIST,
  IS_SENDING_DOG
} from './ProfileWishlistTypes'

export const INITIAL_STATE = {
  myDogsWishlist: [],
  isFetchingMyDogsWishlist: false,
  isSendingDog: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MY_DOGS_WISHLIST:
      return { ...state, myDogsWishlist: action.payload }
    case IS_FETCHING_MY_DOGS_WISHLIST:
      return { ...state, isFetchingMyDogsWishlist: action.payload }
    case IS_SENDING_DOG:
      return { ...state, isSendingDog: action.payload }
    default:
      return state
  }
}
