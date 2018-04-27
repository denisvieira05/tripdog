import ServiceDataSource from '../ServiceDataSource'
import FakeDogsApiDataSource from './FakeDogsApiDataSource'
import DogsApiDataSource from './DogsApiDataSource'

class DogsService extends ServiceDataSource {

  constructor() {
    super(FakeDogsApiDataSource, DogsApiDataSource)
  }

  getDogs() {
    return this.datasource().getDogs()
  }

  getMyDogsWishlist() {
    return this.datasource().getMyDogsWishlist()
  }

  sendDog(dog) {
    return this.datasource().sendDog(dog)
  }

  handleDogToUserOnWishlist(dog) {
    return this.datasource().handleDogToUserOnWishlist(dog)
  }

}

export default DogsService