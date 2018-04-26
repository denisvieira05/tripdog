
import DogsService from '../../services/dogs/DogsService'
import {
  UPDATE_MY_DOGS_WISHLIST,
  IS_FETCHING_MY_DOGS_WISHLIST,
  IS_SENDING_DOG
} from './ProfileWishlistTypes'

export const updateMyDogsWishlist = (myDogsWishlist) => {
  return {
    type: UPDATE_MY_DOGS_WISHLIST,
    payload: myDogsWishlist,
  }
}

export const isFetchingMyDogsWishlist = (isFetching) => ({
  type: IS_FETCHING_MY_DOGS_WISHLIST,
  payload: isFetching,
})

export const isSendingDog = (isSendingDog) => ({
  type: IS_SENDING_DOG,
  payload: isSendingDog,
})

export const loadMyDogsWishlist = () => {
  return async (dispatch) => {
    dispatch(isFetchingMyDogsWishlist(true))

    const dogs = await new DogsService().getMyDogsWishlist()

    dispatch(updateMyDogsWishlist(dogs))
    dispatch(isFetchingMyDogsWishlist(false))
  }
}

export const sendDog = (newDog) => {
  return (dispatch) => {

    dispatch(isSendingDog(true))

    new DogsService().sendDog(newDog).then(() => {
      dispatch(loadMyDogsWishlist())
      dispatch(isSendingDog(false))
    })
    .catch((error) => {
      dispatch(isSendingDog(false))
    });

  }
}