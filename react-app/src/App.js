import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
//Dashboardlike routes
import GraphDashboard from './pages/GraphDashboard';
import './reset.css';

const App = () => {
  useEffect(() => {

  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={GraphDashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
