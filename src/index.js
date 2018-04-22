import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import registerServiceWorker from './registerServiceWorker';
import Store from './config/Store.js'

const rootEl = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <Component store={Store} />
    , rootEl,
  );
};

render(Application);
registerServiceWorker();
