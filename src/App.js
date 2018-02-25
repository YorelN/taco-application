import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./common/Layout";
import './App.scss'


// const isLoggedInComponent = connect(state => ({
//   isLoggedIn: state.auth.isLoggedIn
// }));
//
// const PrivateRoute = isLoggedInComponent(
//   ({ component: Component, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         rest.isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/home",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   )
// );

class App extends Component {
  render() {
    return (
        <Switch className="App">
          <Route path="/" component={Layout}/>
        </Switch>
    )
  }
}

export default App;
