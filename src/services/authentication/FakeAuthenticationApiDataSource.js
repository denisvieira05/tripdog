import axios from 'axios'
import ApiDataSource from '../ApiDataSource'
import AuthenticationConverter from './AuthenticationConverter'
import * as firebase from "firebase";

class AuthenticationApiDataSource extends ApiDataSource {
  
  isAuthenticated() {
    // return this.datasource().isAuthenticated()
  }

  signIn(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((snapshot) => {
          console.log('auth', snapshot)
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;

        });
    })
  }

  signOut() {
    // return this.datasource().signOut()
  }

  signUp(name, email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((snapshot) => {
          console.log('auth', snapshot)
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;

        });
    })
  }

}

export default AuthenticationApiDataSource