import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Card, Col } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

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
            <CardTitle title="SIGN UP"/>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {
                  getFieldDecorator('userName', {
                    rules: [{
                      required: true,
                      message: 'Please input your username!'
                    }],
                  })(<Input prefix={<Icon type="user" />} placeholder="Username" />)
                }
              </FormItem>
              
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
                <Button type="primary" htmlType="submit">Sign Up</Button>
                &nbsp;Or <Link to="signin">Back</Link>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  teste: state.authentication.teste,
})

const LoginForm = Form.create()(Login);

export default connect(mapStateToProps, null)(LoginForm);
