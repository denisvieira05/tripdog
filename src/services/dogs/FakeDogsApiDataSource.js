import dogs from './dogs.json'

class FakeDogsApiDataSource {

  getDogs() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dogs)
      }, 2000)
    })
  }

}

export default FakeDogsApiDataSource