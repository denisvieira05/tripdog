import React from 'react';
import './AppMain.css'
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
import LikeDogs from '../like-dogs/LikeDogs'; 
import Authentication from '../authentication/Authentication'; 
import PrivateRoute from '../../components/PrivateRoute'
import { AppRoutes } from '../like-dogs/components/MainBreadcrumb'

const Profile = () => ( <h1>PROFILE </h1>)

const AppMain = ({ isAuthenticated }) => {
  return (
    <div>
      <Route exact path="/auth" component={Authentication} />
      <Route exact path="/" component={LikeDogs} />
      <PrivateRoute exact path="/profile" component={Profile} isAuthenticated={isAuthenticated} />
      <PrivateRoute path="/apps" component={AppRoutes} isAuthenticated={isAuthenticated}/>
    </div>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
})

export default withRouter(connect(mapStateToProps, null)(AppMain));
