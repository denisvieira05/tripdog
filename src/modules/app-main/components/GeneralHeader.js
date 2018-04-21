
import React from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

const GeneralHeader = () => {

  return (
    <Header style={{ display: 'flex' }}>
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
  )
}

export default GeneralHeader