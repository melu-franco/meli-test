import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import List from './pages/List';
import Product from './pages/Product';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/items' component={List}/>
            <Route path='/items/:id' component={Product}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
