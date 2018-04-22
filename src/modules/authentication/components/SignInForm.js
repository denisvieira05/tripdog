import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Card, Col, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as AuthenticationActions from '../AuthenticationActions'

const FormItem = Form.Item;

const CardTitle = ({ title }) => (
  <Row type="flex" justify="space-around" align="middle" className="card-title">
    <Col
      span={12}
      justify="center"
      align="middle"
      className="dasdkosad dkasodk ">
      <h1 className="login-title">{title}</h1>
    </Col>
  </Row>
)

class Login extends Component {
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

    return (
      <Row type="flex" justify="space-around" align="middle" size={"small"}>
        <Col span={8}>

          <Card>
            <CardTitle title="SIGN IN"/>
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
                  getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>Remember me</Checkbox>)
                }
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit" loading={this.props.isAuthenticating}>Log in</Button>
                &nbsp;Or  <Link to="signup">register now!</Link>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.authentication.isAuthenticating,
})

const mapDispatchToProps = {
  signIn: AuthenticationActions.signIn,
}

const LoginForm = Form.create()(Login);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
