
import DogsService from '../../services/dogs/DogsService'
import {
  UPDATE_DOGS,
  IS_FETCHING_DOGS
} from './ProfileWishlistTypes'

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

    console.log(dogs)
    dispatch(updateDogs(dogs))
    dispatch(isFetchingDogs(false))
  }
}