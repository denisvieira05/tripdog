import dogs from './dogs.json'

class FakeDogsApiDataSource {

  getDogs() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dogs)
      }, 2000)
    })
  }

  getMyDogsWishlist(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dogs)
      }, 2000)
    })
  }

  sendDog(dog) {

  }

  addDogToWishlist(dog) {

  }

}

export default FakeDogsApiDataSource