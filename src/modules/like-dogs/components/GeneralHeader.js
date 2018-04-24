
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as AuthenticationActions from '../../authentication/AuthenticationActions'

const { Header } = Layout;

const GeneralHeader = (props) => {
  const { isAuthenticated, signOut } = props

  const onPressMenuItemActions = {
    "3": () => signOut(),
  }

  const onClickMenu = (item, key, keyPath) => {
    if (onPressMenuItemActions[key]){
      return onPressMenuItemActions[key]()
    }    
  }

  return (
    <Header style={{ display: 'flex' }}>
      <div className="app-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
        onClick={({item, key, keyPath}) => onClickMenu(item, key, keyPath)}
      >
        <Menu.Item key="1"><Link to="/">Like Dogs</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/apps">Apps</Link></Menu.Item>
        {
          isAuthenticated ? (
            <Menu.Item key="3" >Logout</Menu.Item>
          ): (
            <Menu.Item key="4" > <Link to="/auth">Login</Link></Menu.Item>
          )
        }      
        
      </Menu>
    </Header>
  )
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
})

const mapDispatchToProps = {
  signOut: AuthenticationActions.signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralHeader)