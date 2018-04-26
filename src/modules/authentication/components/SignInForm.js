import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Card, Col, Alert } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as AuthenticationActions from '../AuthenticationActions'
import { tripDogLogo } from '../../../assets/Images'

const FormItem = Form.Item;

class SignInForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values
        this.props.signIn(email, password)
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { signInError } = this.props

    return (
      <Row type="flex" justify="space-around" align="middle" size={"small"}>
        <Col span={8}>

          <Card style={{ borderRadius: 10}}>
            <div style={styles.titleContainer}>
              <img alt="Trip Dog" style={styles.logoStyle} src={tripDogLogo} />
              <h2 style={styles.titleStyle}>Welcome to TripDog</h2>
              <h3 style={styles.subTitleStyle}>Search, like and share dogs around the world .</h3>
              <h2>Log In</h2>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {
                  getFieldDecorator('email', {
                    rules: [{
                      required: true,
                      message: 'Please input your email!'
                    }],
                  })(<Input prefix={<Icon type="mail" />} placeholder="Email" />)
                }
              </FormItem>

              <FormItem>
                {
                  getFieldDecorator('password', {
                    rules: [{
                      required: true,
                      message: 'Please input your password!'
                    }],
                  })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)
                }
              </FormItem>

              <FormItem>
              {
                signInError ? (
                  <Alert message={signInError} type="error" />
                ) : null
              }
              </FormItem>

              <FormItem>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={this.props.isAuthenticating}
                  style={styles.loginButton}
                > 
                  Log in 
                </Button>
                &nbsp;Or  <Link to="signup" style={styles.textOrangeStyle}>register now!</Link>
              </FormItem>
              
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const styles = {
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
  },
  titleStyle: {
    fontWeight: 'bold',
    color: '#555555'
  },
  subTitleStyle: {
    color: '#D9D9D9'
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#FFB427',
    borderColor: '#FFB427'
  },
  logoStyle: {
    width: '5em',
  },
  textOrangeStyle: {
    color: '#FFB427'
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.authentication.isAuthenticating,
  signInError: state.authentication.signInError,
})

const mapDispatchToProps = {
  signIn: AuthenticationActions.signIn,
}


const SignInFormWithAntd = Form.create()(SignInForm);

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormWithAntd);
