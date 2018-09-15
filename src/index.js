import React from 'react';
import { render } from 'react-dom';
import './css/style.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route path="*" exact={true} component={NotFound} /> 
      </Switch>
    </Router>
  )
}

render(<Root/>, document.getElementById('main'));






