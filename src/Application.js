import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AppMain from './modules/app-main/AppMain';

const Application = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route pattern="/" component={AppMain} />
    </BrowserRouter>
  </Provider>
);

Application.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Application;
