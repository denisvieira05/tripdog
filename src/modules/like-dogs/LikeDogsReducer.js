import {
  UPDATE_DOGS,
  IS_FETCHING_DOGS
} from './LikeDogsTypes'

export const INITIAL_STATE = {
  dogs: [],
  isFetchingDogs: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DOGS:
      return { ...state, dogs: action.payload }
    case IS_FETCHING_DOGS:
      return { ...state, isFetchingDogs: action.payload }
    default:
      return state
  }
}
