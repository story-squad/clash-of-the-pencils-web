import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LandingPageContainer } from './components/pages/LandingPage';
import { Activation } from './components/pages/Activated';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={['/', '/login', '/register', '/signup']}
          component={() => <LandingPageContainer />}
        />
        <Route path="/activated/:token" component={Activation} />
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
