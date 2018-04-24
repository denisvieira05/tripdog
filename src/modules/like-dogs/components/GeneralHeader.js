
import React from 'react';
import { Layout, Menu, Input } from 'antd'; 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as AuthenticationActions from '../../authentication/AuthenticationActions'
import { tripDogLogo } from '../../../assets/Images'

const { Header } = Layout;
const Search = Input.Search;

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
        <Link to="/apps">My Wishlist</Link>
        {
          isAuthenticated ? (
            <a onClick={() => signOut()}>Logout</a>
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