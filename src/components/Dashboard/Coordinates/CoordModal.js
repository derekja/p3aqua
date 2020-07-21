import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// for some reason this won't close when you click off of the modal...
// need to fix this.
// both the info and the lat/lon modal do this ok. so weird.
class CoordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  handleChange = e => {
    this.props.onChange(e);
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  toggleDropPin = () => {
    this.setState(prevState => ({
      show: false
    }));
    this.props.toggleDropPin();
  };

  toggleLatLonPopup = () => {
    this.setState(prevState => ({
      show: false
    }));
    this.props.toggleLatLonPopup();
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle} className="coord-btn">
          <i className="fa fa-fw fa-map-marker" />
        </Button>
        <Modal
          isOpen={this.state.show}
          toggle={this.state.toggle}
          className="coord-modal"
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <div className="options">
              <Button color="secondary" onClick={this.toggleLatLonPopup}>
                Enter Coordinates
              </Button>
              <Button color="secondary" onClick={this.toggleDropPin}>
                Drop Pin
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>{" "}
          </ModalFooter>{" "}
        </Modal>
      </div>
    );
  }
}

export default CoordModal;
