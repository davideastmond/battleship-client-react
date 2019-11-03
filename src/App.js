import React from 'react';
import logo from './logo.svg';
import './App.css';
import PageOne from './pages/PageOne';
import Game from './pages/Game';
import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={PageOne} />
      <Route exact path="/game" component={Game} />
    </Switch>
  );
}

export default App;
