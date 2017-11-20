import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import Home from "./features/dashboard/components/Home";

const App = () => (
  <div id="App">
    <Layout />
    <div className="home">
      <Route path="/yay" component={Home}/>
      <Route path="/yoy" component={Home}/>
    </div>
  </div>
);

export default App;
