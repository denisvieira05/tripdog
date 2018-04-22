
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'

const { Header } = Layout;

const GeneralHeader = () => {

  return (
    <Header style={{ display: 'flex' }}>
      <div className="app-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">Like Dogs</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/apps">Apps</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/auth">Login</Link></Menu.Item>
      </Menu>
    </Header>
  )
}

export default GeneralHeader