
import DogsService from '../../services/dogs/DogsService'
import {
  UPDATE_DOGS,
  IS_FETCHING_DOGS
} from './LikeDogsTypes'

import { showActionMessage } from '../profile-wishlist/ProfileWishlistActions'

export const updateDogs = (dogs) => {
  return {
    type: UPDATE_DOGS,
    payload: dogs,
  }
}

export const isFetchingDogs = (isFetching) => ({
  type: IS_FETCHING_DOGS,
  payload: isFetching,
})

export const loadDogs = () => {
  return async (dispatch) => {
    dispatch(isFetchingDogs(true))

    const dogs = await new DogsService().getDogs()

    dispatch(updateDogs(dogs))
    dispatch(isFetchingDogs(false))
  }
}

export const handleDogToWishList = (dogLiked) => {
  return async (dispatch) => {
    new DogsService().handleDogToUserOnWishlist(dogLiked).then(() => {
      dispatch(showActionMessage({ type: 'success', text: dogLiked.name + ' - Wishlist Dog Status Updated' }))
    })

  }
}