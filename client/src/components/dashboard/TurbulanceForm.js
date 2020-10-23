import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class TurbulenceForm extends React.Component {
  state = {
    routefrom: "",
    routeto: "",
    altitude: "",
  };
  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      routeto: this.state.routeto,
      routefrom: this.state.routefrom,
      altitude: this.state.altitude,
    };
    axios({
      url: "/api/turbpost",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Posted Successifully");
        this.resetUserInputs();
        this.getTurbulenceData();
      })
      .catch(() => {
        console.log("Error Server");
      });
  };
  resetUserInputs = () => {
    this.setState({
      routefrom: "",
      routeto: "",
      altitude: "",
    });
  };
  render() {
    console.log("State", this.state);
    return (
      <div className="turbulence">
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group controlId="routefromId">
              <Form.Label> Route From: </Form.Label>
              <Form.Control
                name="routefrom"
                value={this.state.routefrom}
                type="text"
                placeholder="Route From"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="routetoId">
              <Form.Label>Route To: </Form.Label>
              <Form.Control
                name="routeto"
                value={this.state.routeto}
                type="text"
                placeholder="Route To"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Altitude:</Form.Label>
              <Form.Control
                name="altitude"
                value={this.state.altitude}
                type="text"
                placeholder="Enter Altitude"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default TurbulenceForm;
