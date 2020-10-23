import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableData from "./TableData";

class Landing extends Component {
  render() {
    return (
      <>
        <div className="container">
          <TableData />
        </div>
      </>
    );
  }
}

export default Landing;
