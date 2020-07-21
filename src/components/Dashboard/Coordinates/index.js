import React, { Component } from "react";
import { NavItem, Button } from "reactstrap";
import CoordModal from "./CoordModal";
import LatLonPopup from "./LatLonPopup";

class Coordinates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLatLonPopup: false
    };
  }

  toggleLatLonPopup = () => {
    this.setState(prevState => ({
      showLatLonPopup: !prevState.showLatLonPopup
    }));
  };

  render() {
    if (!this.props.mobileVersion) {
      return (
        <NavItem className="coordinates">
          <i className="fa fa-fw fa-map-marker" />
          <div className="options">
            <Button color="secondary" onClick={this.toggleLatLonPopup}>
              Enter Coordinates
            </Button>
            <Button color="secondary" onClick={this.props.toggleDropPin}>
              {this.props.droppingPin ? "Cancel" : "Drop Pin"}
            </Button>
          </div>
          {this.state.showLatLonPopup && (
            <LatLonPopup
              addNewMarker={this.props.addMarker}
              showLatLonPopup={this.state.showLatLonPopup}
              toggleLatLonPopup={this.toggleLatLonPopup}
            />
          )}
        </NavItem>
      );
    } else {
      return (
        <div className="modal-btn">
          <CoordModal
            toggleDropPin={this.props.toggleDropPin}
            onChange={this.handleChange}
            showLatLonPopup={this.state.showLatLonPopup}
            toggleLatLonPopup={this.toggleLatLonPopup}
          />
          <LatLonPopup
            addNewMarker={this.props.addMarker}
            showLatLonPopup={this.state.showLatLonPopup}
            toggleLatLonPopup={this.toggleLatLonPopup}
          />
        </div>
      );
    }
  }
}

export default Coordinates;
