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

  signIn() {
    return this.datasource().signIn()
  }

  signOut() {
    return this.datasource().signOut()
  }

  signUp() {
    return this.datasource().createAuthorization()
  }

}

export default AuthenticationService