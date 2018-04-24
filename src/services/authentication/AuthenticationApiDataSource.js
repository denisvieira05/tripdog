import axios from 'axios'
import ApiDataSource from '../ApiDataSource'
import AuthenticationConverter from './AuthenticationConverter'
import * as firebase from "firebase";

export const UID_LOCALSTORAGE_KEY = 'uid'
export const REFRESH_TOKEN_LOCALSTORAGE_KEY = 'refresh_token'

class AuthenticationApiDataSource extends ApiDataSource {
  
  isAuthenticated() {
    // return this.datasource().isAuthenticated()
  }

  saveNewUserData(userId, name, email, profileImageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture: profileImageUrl
    });
  }

  signIn(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((snapshot) => {
          const { refreshToken, uid } = snapshot

          localStorage.setItem(UID_LOCALSTORAGE_KEY, uid)
          localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refreshToken)

          resolve()
        })
        .catch(function (error) {
          reject(error)
        });
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
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((snapshot) => {
          const { refreshToken, uid} = snapshot

          this.saveNewUserData(uid, name, email, "image_url")

          localStorage.setItem(UID_LOCALSTORAGE_KEY, uid)
          localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refreshToken)

          resolve()
        })
        .catch(function (error) {
          reject(error)
        });
    })
  }
}

export default AuthenticationApiDataSource