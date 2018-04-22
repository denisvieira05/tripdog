import React from 'react';
import './AppMain.css'
import 'antd/dist/antd.css';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
import LikeDogs from '../like-dogs/LikeDogs'; 
import Authentication from '../authentication/Authentication'; 
import PrivateRoute from '../../components/PrivateRoute'
import { AppRoutes } from '../like-dogs/components/MainBreadcrumb'

const Profile = () => ( <h1>PROFILE </h1>)

const AppMain = withRouter((props) => {

  return (
    <div>
      <Route exact path="/auth" component={Authentication} />
      <Route exact path="/" component={LikeDogs} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute path="/apps" component={AppRoutes} />
    </div>
  )
});

export default AppMain;
