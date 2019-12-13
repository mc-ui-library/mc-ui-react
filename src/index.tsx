import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./index.scss";
import Home from './home/home';

const NotFoundPage = () => (
  <div className="mc-not-found">
    404 Not Found: <Link to="/">Go Home </Link>
  </div>
);

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="" component={Home} exact={true} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));