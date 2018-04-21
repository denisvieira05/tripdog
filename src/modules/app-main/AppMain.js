import React from 'react';
import './AppMain.css'
import { Layout, Menu, Row, Col} from 'antd';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import LikeDogs from '../like-dogs/LikeDogs'; 
import Login from '../login/Login'; 
import 'antd/dist/antd.css';
import MainBreadcrumb, { AppRoutes } from './components/MainBreadcrumb'

const { Header, Content } = Layout;

const AppMain = withRouter((props) => {

  return (
    <Layout className="layout" >
      <Header style={{ display: 'flex'}}>
        <div className="app-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px', alignSelf: 'flex-end' }}
        >
          <Menu.Item key="1">Like Dogs</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">Login</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px', backgroundColor: '#F0F2F5' }}>
        <MainBreadcrumb location={ props.location }/>
        <div>
          <Route exact path="/" component={LikeDogs} breadcrumbName="LikeDogs"/>
          <Route exact path="/login" component={Login} breadcrumbName="Login" />
          <Route path="/apps" component={AppRoutes} />
        </div>
      </Content>
    </Layout>
  )
});

export default AppMain;
