import React, { useEffect } from 'react';
import AppState from './appContext/AppState';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import Home from './components/Home';
import './App.scss';

function App() {
  return (
    <AppState>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    </AppState>
  );
}

export default App;
