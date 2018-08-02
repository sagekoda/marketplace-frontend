import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {render} from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import indexRoutes from "./routes/index.jsx";

import "./assets/scss/material-kit-react.css?v=1.1.0";

var hist = createBrowserHistory();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);


render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          const { path, exact, Component } = prop;
          return <Route path={path} exact={exact} key={key} render={(props) => <Component {...props} />} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
