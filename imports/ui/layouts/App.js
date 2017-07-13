import React from 'react';
import PropTypes from 'prop-types';
// import { RouteTransition } from 'react-router-transition';
// import Alert from 'react-s-alert';

const App = ({ children }) => (
  <div className="app-wrap">
    { children }
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
