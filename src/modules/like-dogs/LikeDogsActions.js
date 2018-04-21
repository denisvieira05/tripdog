
import DogsService from '../../services/dogs/DogsService'
import {
  UPDATE_DOGS,
  IS_FETCHING_DOGS
} from './LikeDogsTypes'

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
    // const token = await dbGetToken()
    const token = '3c4aa43a65a23809cf344260b9ed0dd96bcea318a0c31c6b25d1f49332c73ca7'

    await new DogsService().getDogs(token)
      .then((response) => {
        console.log(response)
        dispatch(updateDogs(response))
        dispatch(isFetchingDogs(false))
      })
  }
}