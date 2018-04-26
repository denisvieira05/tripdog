import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
import LikeDogs from '../like-dogs/LikeDogs'; 
import ProfileWishlist from '../profile-wishlist/ProfileWishlist'; 
import Authentication from '../authentication/Authentication'; 
import PrivateRoute from '../../components/PrivateRoute'

const AppMain = ({ isAuthenticated }) => {
  return (
    <div>
      <Route exact path="/auth" component={Authentication} />
      <Route exact path="/" component={LikeDogs} />
      <PrivateRoute exact path="/profile" component={ProfileWishlist} isAuthenticated={isAuthenticated} />
    </div>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
})

export default withRouter(connect(mapStateToProps, null)(AppMain));
