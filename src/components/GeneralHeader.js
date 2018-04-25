
import React from 'react';
import { Layout, Menu, Input, Dropdown, Icon, Avatar } from 'antd'; 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as AuthenticationActions from '../modules/authentication/AuthenticationActions'
import { tripDogLogo } from '../assets/Images'

const { Header } = Layout;
const Search = Input.Search;

const GeneralHeader = (props) => {
  const { isAuthenticated, signOut } = props

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
          onSearch={value => console.log(value)}
        />
      </div>
      <div style={{ display: 'flex', flex: 2, justifyContent: 'space-around'}}>
        <Link to="/">Explore Dogs</Link>
        {
          isAuthenticated ? ( <Link to="/profile">My Wishlist</Link> ) : null }
        {
          isAuthenticated ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                <Avatar icon="user" />  Denis Vieira    <Icon type="down" />
              </a>
            </Dropdown>
          ) : (
              <Link to="/auth">Log In</Link>
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
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
})

const mapDispatchToProps = {
  signOut: AuthenticationActions.signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralHeader)