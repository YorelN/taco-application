import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducers from './rootReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, {}, compose(applyMiddleware(ReduxPromise, ReduxThunk)));

const history = createBrowserHistory();

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
registerServiceWorker();
