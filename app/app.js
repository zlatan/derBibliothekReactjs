import React from 'react';
import ReactDOM from 'react-dom';

import { IndexRoute, Router, Route } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

const history = createHistory( { queryKey: false } );

import Application from './components/Application';
import Home from './components/Home';
import Students from './components/Students';
import Books from './components/Books';
import PageNotFound from './components/PageNotFound';

const routes = (
  <Router history={ history }>
    <Route path='/' component={ Application }>
      <IndexRoute component={ Home } />
      <Route path='students' component={ Students }/>
      <Route path='books' component={ Books }/>
      <Route path='*' component={ PageNotFound }/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#root'));
