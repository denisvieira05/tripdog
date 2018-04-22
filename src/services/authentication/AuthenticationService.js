import ServiceDataSource from '../ServiceDataSource'
import FakeAuthenticationApiDataSource from './FakeAuthenticationApiDataSource'
import AuthenticationApiDataSource from './AuthenticationApiDataSource'

class AuthenticationService extends ServiceDataSource {

  constructor() {
    super(FakeAuthenticationApiDataSource, AuthenticationApiDataSource)
  }

  isAuthenticated() {
    return this.datasource().isAuthenticated()
  }

  signIn(email, password) {
    return this.datasource().signIn(email, password)
  }

  signOut() {
    return this.datasource().signOut()
  }

  signUp() {
    return this.datasource().createAuthorization()
  }

}

export default AuthenticationService