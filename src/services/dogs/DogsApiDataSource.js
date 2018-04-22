import axios from 'axios'
import ApiDataSource from '../ApiDataSource'
import DogsConverter from './DogsConverter'

class DogsApiDataSource extends ApiDataSource {

  getDogs(accessToken) {
    return new Promise((resolve, reject) => {
      this.firebaseDatabase.ref('/dogs/').once('value')
        .then((snapshot) => {
          const dogs = new DogsConverter().mapperResponsesToEntities(snapshot.val())
          resolve(dogs)
        })
    })
  }

}

export default DogsApiDataSource