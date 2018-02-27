import React from "react";
import { render } from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "react-router-dom";
import {Provider} from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";
import reducers from "./rootReducer";
import { createBrowserHistory } from "history";

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(ReduxPromise, ReduxThunk))
);

const app = (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <App />
    </Router>
  </Provider>
);

render(app, document.getElementById("root"));
