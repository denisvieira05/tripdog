import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import { HashRouter as Router, Route, withRouter, Redirect } from 'react-router-dom'
import { manyDogsImg } from '../../assets/Images'
import './AuthenticationStyles.css'
class Authentication extends PureComponent {

  render() {
    const { isAuthenticated } = this.props

    if(isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <div
        className="auth-container">

        <div
          style={styles.blackTransparentContainer}>
        </div>
        <Row
          type="flex"
          justify="center"
          align="middle"
          size={"small"}
        >
          <Col span={24} style={styles.innerContainer} >
            <Router>
              <div>
                <Route exact path="/" render={() => (
                  <Redirect to="/signin" />
                )} />

                <Route exact path="/signin" component={SignInForm} />
                <Route exact path="/signup" component={SignUpForm} />
              </div>
            </Router>
          </Col>
        </Row>

      </div>
      
    );
  }
}

const styles = {
  blackTransparentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: '0.3'
  },
  innerContainer: {
    paddingTop: '2em',
    paddingBottom: '10em'
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
})

export default withRouter(connect(mapStateToProps, null)(Authentication));
