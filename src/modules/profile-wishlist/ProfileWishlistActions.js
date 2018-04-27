
import DogsService from '../../services/dogs/DogsService'
import {
  UPDATE_MY_DOGS_WISHLIST,
  IS_FETCHING_MY_DOGS_WISHLIST,
  IS_SENDING_DOG,
  SHOW_ACTION_MESSAGE
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

export const showActionMessage = (actionMessage) => ({
  type: SHOW_ACTION_MESSAGE,
  payload: actionMessage,
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

export const handleDogToWishListOnProfile = (dogLiked) => {
  return async (dispatch) => {
    dispatch(isFetchingMyDogsWishlist(true))

    new DogsService().handleDogToUserOnWishlist(dogLiked).then(() => {
      dispatch(loadMyDogsWishlist())
      dispatch(showActionMessage({ type: 'success', text: dogLiked.name + ' - Wishlist Dog Status Updated' }))
    })

  }
}