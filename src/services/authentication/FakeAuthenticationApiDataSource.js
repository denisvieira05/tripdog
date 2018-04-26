import ApiDataSource from '../ApiDataSource'

export const UID_LOCALSTORAGE_KEY = 'uid'
export const REFRESH_TOKEN_LOCALSTORAGE_KEY = 'refresh_token'
class AuthenticationApiDataSource extends ApiDataSource {

  getUser(userId) {
    return new Promise((resolve, reject) => {

    })
  }

  signIn(email, password) {
    return new Promise((resolve, reject) => {

    })
  }

  signOut() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(UID_LOCALSTORAGE_KEY)
      localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY)

      resolve()
    })
  }

  signUp(name, email, password) {
    return new Promise((resolve, reject) => {
      // const { refreshToken, uid } = snapshot

      // this.saveNewUserData(uid, name, email, "image_url")

      // localStorage.setItem(UID_LOCALSTORAGE_KEY, uid)
      // localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refreshToken)

      resolve()
    })
  }

}

export default AuthenticationApiDataSource