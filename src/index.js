import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Router, Route } from 'react-router'
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

class Test extends Component {

  constructor() {
    super();
    this.state = {
      title: 'hey'
    }
  }

  handleClick() {
    axios
      .get('/api/test')
      .then(res => this.setState({title: res.data}));
  }

  render() {
    return (
      <div className="test-mamene">
        <h1>Testouille</h1>
        <a href="/" className="link-to-test">click</a>
        <span onClick={() => this.handleClick()}>{this.state.title}</span>
      </div>
    );
  }
};

render(
    <Provider store={store}>
        <Router history={history}>
            <div>
              <Route path="/" component={App} />
              <Route path="/test" component={Test} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
registerServiceWorker();
