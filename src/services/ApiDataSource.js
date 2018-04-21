import { API_ENVIROMENTS, BASE_URLS } from './CONSTANTS'

class ApiDataSource {

  constructor(apiEnviroment) {
    this.API_ENVIROMENT = apiEnviroment
  }

  getBaseUrl() {
    const { LOCAL, STAGE, PROD } = API_ENVIROMENTS

    const action = {
      LOCAL: () => BASE_URLS.LOCAL,
      STAGE: () => BASE_URLS.STAGE,
      PROD: () => BASE_URLS.PROD,
    }

    return action[this.API_ENVIROMENT]();
  }
}

export default ApiDataSource