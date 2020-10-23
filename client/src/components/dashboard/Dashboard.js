import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import TurbulenceForm from "./TurbulanceForm";
import TableData from "../layout/TableData";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <>
        <Container>
          <Row>
            <Col xs>
              Welcome {user.name}!<br />
              <br />
              <TurbulenceForm />
              <br></br>
              <input
                type="button"
                onClick={this.onLogoutClick}
                value="Logout"
              />
            </Col>
            <Col xs={9}>
              <TableData />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
