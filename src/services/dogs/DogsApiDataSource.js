import axios from 'axios'
import ApiDataSource from '../ApiDataSource'

class DogsApiDataSource extends ApiDataSource {

  getDogs(accessToken) {
    return axios({
      method: 'post',
      baseURL: this.getBaseUrl(),
      url: '/dogs',
      timeout: 3000,
      data: {
        Authorization: accessToken,
      },
    })
  }

}

export default DogsApiDataSource