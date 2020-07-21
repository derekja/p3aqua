import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "./DatePicker";

class DateModal extends Component {
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

  render() {
    return (
      <div className="modal-btn">
        <Button onClick={this.toggle} className="date-btn">
          <i className="far fa-calendar" />
        </Button>
        <Modal
          isOpen={this.state.show}
          toggle={this.state.toggle}
          className="date-modal"
        >
          <ModalHeader toggle={this.toggle}>Choose Date</ModalHeader>
          <ModalBody>
            <DatePicker
              dateList={this.props.dateList}
              curDate={this.props.curDate}
              onChangeDate={this.props.onChangeDate}
              errorMsg={this.props.errorMsg}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DateModal;
