
import React from 'react';
import { Layout, Menu, Input, Dropdown, Icon, Avatar } from 'antd'; 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as AuthenticationActions from '../modules/authentication/AuthenticationActions'
import { tripDogLogo } from '../assets/Images'

const { Header } = Layout;
const Search = Input.Search;

const GeneralHeader = (props) => {
  const { isAuthenticated, signOut, loggedUser, getLoggedUser, onSearchChanged} = props

  if(!loggedUser){
    getLoggedUser()
  }

  const menu = (
    <Menu onClick={() => signOut()}>
      <Menu.Item key="1">Log Out</Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', background: 'white', justifyContent: 'space-around', paddingBottom: '5em', borderBottom: '1px solid #ccc' }}>
      <div style={{ flex: 0.5 }}> <Link to="/"><img src={tripDogLogo} style={styles.logoMain} /></Link></div>

      <div style={{ flex: 3 }}>
        <Search
          placeholder="Search Dogs"
          onSearch={value => onSearchChanged(value)}
        />
      </div>
      <div style={{ display: 'flex', flex: 2, justifyContent: 'space-around'}}>
        <Link to="/" style={styles.linkStyle}>Explore Dogs</Link>
        {
          isAuthenticated ? (<Link to="/profile" style={styles.linkStyle}>My Wishlist</Link> ) : null }
        {
          isAuthenticated ? (
            <Dropdown overlay={menu} trigger={['click']} >
              <a className="ant-dropdown-link" href="#" style={styles.linkStyle}>
                <Avatar icon="user" />  { loggedUser ? loggedUser.username : null}   <Icon type="down" />
              </a>
            </Dropdown>
          ) : (
              <Link to="/auth" style={styles.linkStyle}>Log In</Link>
            )
        }     
      </div>
    </Header>
  )
}

const styles = {
  logoMain: {
    width: '4.3em',
    height: '4em',
    alignSelf: 'center'
  },
  linkStyle: {
    color: '#FFB427',
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  loggedUser: state.authentication.loggedUser,
})

const mapDispatchToProps = {
  signOut: AuthenticationActions.signOut,
  getLoggedUser: AuthenticationActions.getLoggedUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralHeader)