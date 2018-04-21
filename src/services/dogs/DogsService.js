import ServiceDataSource from '../ServiceDataSource'
import FakeDogsApiDataSource from './FakeDogsApiDataSource'
import DogsApiDataSource from './DogsApiDataSource'

class DogsService extends ServiceDataSource {

  constructor() {
    super(FakeDogsApiDataSource, DogsApiDataSource)
  }

  getDogs(accessToken) {
    return this.datasource().getDogs(accessToken)
  }

}

export default DogsService