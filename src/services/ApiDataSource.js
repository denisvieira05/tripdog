import { API_ENVIROMENTS, BASE_URLS } from './CONSTANTS'
import * as firebase from "firebase";

export const UID_LOCALSTORAGE_KEY = 'uid'
export const REFRESH_TOKEN_LOCALSTORAGE_KEY = 'refresh_token'

var firebaseConfig = {
  apiKey: "AIzaSyAoPeHWIHg5zamgMUQ4RkzulmI3aEvryB4",
  authDomain: "tripdog-6c17a.firebaseapp.com",
  databaseURL: "https://tripdog-6c17a.firebaseio.com",
  projectId: "tripdog-6c17a",
  storageBucket: "tripdog-6c17a.appspot.com",
  messagingSenderId: "237893716018"
};
class ApiDataSource {

  constructor(apiEnviroment) {
    this.USER_ID = localStorage.getItem(UID_LOCALSTORAGE_KEY)
    this.API_ENVIROMENT = apiEnviroment
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
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