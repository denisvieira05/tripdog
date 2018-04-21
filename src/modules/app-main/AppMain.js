import React from 'react';
import './AppMain.css'
import { Layout, Menu, Row, Col} from 'antd';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import LikeDogs from '../like-dogs/LikeDogs'; 
import Login from '../login/Login'; 
import 'antd/dist/antd.css';
import MainBreadcrumb, { AppRoutes } from './components/MainBreadcrumb'
import GeneralHeader from './components/GeneralHeader'

const { Header, Content } = Layout;

const AppMain = withRouter((props) => {

  return (
    <Layout className="layout" >
      <GeneralHeader />
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
