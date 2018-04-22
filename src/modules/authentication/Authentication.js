import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import { HashRouter as Router, Route, withRouter, Redirect } from 'react-router-dom'

class Authentication extends PureComponent {

  render() {

    return (
      <Row type="flex" justify="space-around" align="middle" size={"small"}>
        <Col span={24}>
          <Router>
            <div>
              <Route exact path="/" render={() => (
                <Redirect to="/signin" />
              )} />

              <Route exact path="/signin" component={SignInForm}  />
              <Route exact path="/signup" component={SignUpForm}  />
            </div>
          </Router>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  teste: state.authorization.teste,
})

export default withRouter(connect(mapStateToProps, null)(Authentication));
