import React from "react";
import { Link } from "react-router";

class TopNavigation extends React.Component {
  render() {
    return (
      <nav className="menu">
        <ul className="navbar">
          <li>Home</li>
          <li>Contribute</li>
        </ul>
      </nav>
    );
  }
}

export default TopNavigation;
