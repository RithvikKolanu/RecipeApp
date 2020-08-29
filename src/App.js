import React, { useState, useEffect } from 'react';
import Home from './components/Home.js';
import Recipe from './components/Recipeinfo.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Recipeinfo from './components/Recipeinfo.js';


function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/recipe/:id' component={Recipeinfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
