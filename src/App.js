import React from 'react';
import logo from './logo.svg';
import './App.css';
import PageOne from './pages/PageOne';
import {Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={PageOne} />
    </Switch>
  );
}

export default App;
