import React, { Component } from "react";
import "./properties/style.css";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";
import Home from "./properties/navigation/Home";
import InsertForm from "./properties/navigation/InsertForm";
import CityChart from "./properties/navigation/CityChart";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul className="navbar">
            <li>
              <NavLink
                className="nav-link"
                to="/"
                exact={true}
                activeStyle={{ color: "gray" }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/cityChart/"
                activeStyle={{ color: "gray" }}
              >
                City Chart
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/contribute"
                exact={true}
                activeStyle={{ color: "gray" }}
              >
                Contribute
              </NavLink>
            </li>
          </ul>
          <Route path="/" exact={true} component={Home} />
          <Route path="/cityChart/:city?" exact={true} component={CityChart} />
          <Route path="/contribute" exact={true} component={InsertForm} />
        </div>
      </Router>
    );
  }
}

export default App;
