import React from 'react';
// import './Main.scss'
import { Layout, Row, Col } from 'antd';
// import { stantIcon } from '../../assets/images';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router';
import LikeDogs from '../like-dogs/LikeDogs';

const customHistory = createBrowserHistory()

const { Header, Content } = Layout;

const AppMain = () => (
  <Layout className="layout">
    <Header>
      <Row type="flex" justify="center">
        <Col span={1} >
        TESTE BARRA
          {/* <img className="logo" src={stantIcon} style={{ width: 50, height: 50 }} /> */}
        </Col>
      </Row>
    </Header>
    <Content style={{ padding: '50px' }}>
      <Router history={customHistory}>
        <div>
          <Route exact path="/" component={LikeDogs} />
        </div>
      </Router>
    </Content>
  </Layout>
);

export default AppMain;
