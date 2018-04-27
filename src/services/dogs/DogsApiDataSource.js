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

  handleDogToUserOnWishlist(dog) {
    return new Promise( async (resolve, reject) => {
      let hasDogOnWishlist = false;
      const { dogKey, user } = dog

      const newDogMapped = new DogsConverter().mapperEntityToRequest(dog, user, this.USER_ID, dogKey)

      firebase.database().ref('users/' + this.USER_ID).child('wishlist').orderByChild('dog_key').equalTo(dogKey).once("value").then((snapshot) => {
        if(snapshot.val()){
          this._removeDogFromUserWishlist(newDogMapped).then(() => {
            resolve()
          }).catch((error) => {
            reject(error)
          })
        } else {
          this._addDogToUserWishlist(newDogMapped).then(() => {
            resolve()
          }).catch((error) => {
            reject(error)
          })
        }
      });
    })
  }

  _addDogToUserWishlist(newDog) {
    return new Promise((resolve, reject) => {
      const { dog_key } = newDog

      var addDogAction = {};
      addDogAction['users/' + this.USER_ID + '/wishlist/' + dog_key] = newDog;

      firebase.database().ref().update(addDogAction).then(() => {
        console.log('adicionou na wish')
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })

  }

  _removeDogFromUserWishlist(dog) {
    return new Promise((resolve, reject) => {
      const { dog_key } = dog

      var removeDogAction = {};
      removeDogAction['users/' + this.USER_ID + '/wishlist/' + dog_key] = null;

      firebase.database().ref().update(removeDogAction).then(() => {
        console.log('removeu da wish')
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }

}

export default DogsApiDataSource