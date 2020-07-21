import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LatLonPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorType: "",
      show: false
    };
  }

  // creates the latlon object to be pushed up to the addMarker method
  // probably should be moved into helpers
  createLatLon = event => {
    event.preventDefault();
    this.setState({ error: false });
    let latLonRe = /-?[0-9]{1,3}\.[0-9]*,\s*-?[0-9]{1,3}\.[0-9]*/;
    let latLonRaw = event.currentTarget.latlon.value.replace(/ /g, "");
    if (latLonRe.test(latLonRaw)) {
      let latlon = latLonRaw.split(",");
      let marker = {
        latlng: { lat: Number(latlon[0]), lng: Number(latlon[1]) }
      };
      this.props.addNewMarker(marker);
      this.setState({ show: false });
    } else {
      if (!latLonRaw || latLonRaw === "") {
        this.setState({
          error: true,
          errorType:
            "Please enter a latitude and longitude, separated by a comma"
        });
        return;
      }
      this.setState({
        error: true,
        errorType:
          "There seems to be something unusual with the coordinates you gave. Please provide a latitude then longitude, separated by a comma."
      });
      return;
    }
    event.currentTarget.reset();
  };

  toggle = () => {
    this.props.toggleLatLonPopup();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showLatLonPopup}
        toggle={this.props.toggleLatLonPopup}
        className="latlon-modal"
      >
        <ModalHeader toggle={this.toggle}>Enter Coordinates</ModalHeader>
        <ModalBody>
          <form className="latlon" id="latLonForm" onSubmit={this.createLatLon}>
            <input type="text" name="latlon" />
          </form>
          {this.state.error && (
            <div className="error">{this.state.errorType}</div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="submit"
            form="latLonForm"
            className="add-pin"
          >
            Add Pin <i className="fas fa-arrow-right" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default LatLonPopup;
