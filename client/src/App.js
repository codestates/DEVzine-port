import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingContent from './components/Landing';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingContent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
