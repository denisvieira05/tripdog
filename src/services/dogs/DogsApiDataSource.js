import axios from 'axios'
import ApiDataSource from '../ApiDataSource'
import DogsConverter from './DogsConverter'
import * as firebase from "firebase";

class DogsApiDataSource extends ApiDataSource {

  getDogs(accessToken) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/dogs/').once('value')
        .then((snapshot) => {
          const dogs = new DogsConverter().mapperResponsesToEntities(snapshot.val())
          resolve(dogs)
        })
    })
  }

}

export default DogsApiDataSource