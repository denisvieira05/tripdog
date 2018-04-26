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
    var newPostKey = await firebase.database().ref().child('dogs').push().key;
    var updates = {};

    const newDog = new DogsConverter().mapperEntityToRequest(dog, loggedUser, this.USER_ID, newPostKey)

    updates['/dogs/' + newPostKey] = newDog;
    updates['users/' + this.USER_ID + '/wishlist/' + newPostKey] = newDog;

    return new Promise((resolve, reject) => {
      firebase.database().ref().update(updates).then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }

  handleDogToUserOnWishlist(newDog) {
    return new Promise((resolve, reject) => {
      let hasDogOnWishlist = false 
      const {dogKey} = newDog

      firebase.database().ref('users/' + this.USER_ID).child('wishlist').orderByChild('dog_key').equalTo(dogKey).once("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
          console.log('datakey',data.key);
          console.log('data',data)
        });
      });

      // firebase.database().ref('dogs/').push().set(newDog).then(() => {
      //   this._addDogToUserWishlist(newDog).then(() => resolve()).catch((error) => reject(error))
      // }).catch((error) => {
      //   reject(error)
      // })
    })
  }

  _addDogToUserWishlist(newDog) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + this.USER_ID + '/wishlist').push().set(newDog).then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }

  _removeDogFromUserWishlist(dog) {}

}

export default DogsApiDataSource