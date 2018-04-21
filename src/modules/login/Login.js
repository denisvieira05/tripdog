import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Card, Col, Checkbox } from 'antd';
import { connect } from 'react-redux';
import './Login.css';

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
            <CardTitle />
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
                <Button type="primary" htmlType="submit">Log in</Button>
                &nbsp;Or <a href="">register now!</a>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  teste: state.login.teste,
})

const LoginForm = Form.create()(Login);

export default connect(mapStateToProps, null)(LoginForm);
