import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from '../src/components/Home/Home';
import PriceBreakDown from '../src/components/PriceBreakDown/PriceBreakDown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h2 className="align-title">Reservation-Info</h2> */}
        <Switch>
          <Route path='/reservations' component={Home} />
          <Route path='/price-break-down' component={PriceBreakDown} />
          <Redirect from="*" to="/reservations" />
        </Switch>
        {/* <Home /> */}
      </header>
    </div>
  );
}

export default App;
