import ApiDataSource from '../ApiDataSource'
import DogsConverter from './DogsConverter'
import * as firebase from "firebase";
import AuthenticationService from '../authentication/AuthenticationService'

class DogsApiDataSource extends ApiDataSource {

  getDogs() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/dogs').once('value')
        .then((snapshot) => {
          let dogs = []
          if (snapshot.val()) {
            const dogsResponse = Object.values(snapshot.val())
            dogs = new DogsConverter().mapperResponsesToEntities(dogsResponse)
          }
          resolve(dogs)
        })
    })
  }

  getMyDogsWishlist() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + this.USER_ID + '/wishlist').once('value')
        .then((snapshot) => {
          let dogs = []
          if (snapshot.val()){
            const dogsResponse = Object.values(snapshot.val())
            dogs = new DogsConverter().mapperResponsesToEntities(dogsResponse)
          }
          resolve(dogs)
        })
    })
  }

  async sendDog(dog) {
    const loggedUser = await new AuthenticationService().getUser()
    const newDog = new DogsConverter().mapperEntityToRequest(dog, loggedUser, this.USER_ID)
    return new Promise((resolve, reject) => {
      firebase.database().ref('dogs/').push().set(newDog).then(() => {
        this.addDogToUserWishlist(newDog).then(() => resolve()).catch((error) => reject(error))
      }).catch((error) => {
        reject(error)
      })
    })
  }

  handleDogToUserOnWishlist(newDog) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + this.USER_ID + '/wishlist').push().set(newDog).then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }

}

export default DogsApiDataSource