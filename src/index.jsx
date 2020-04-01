import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactGA from 'react-ga';

import * as serviceWorker from './serviceWorker';

import './AppStyles.css';
import App from './App';

ReactGA.initialize('UA-33461307-11');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Fragment>
    <CssBaseline />
    <App />
  </Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
