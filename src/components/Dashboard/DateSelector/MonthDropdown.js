import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const MONTHS = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

class MonthDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  updateMonth = month => {
    let curDay = this.props.curDate.getDate();
    let curYear = this.props.curDate.getFullYear();
    let newDate = new Date(curYear, month, curDay);
    this.props.onChangeDate(newDate);
  };

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    return (
      <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret>{MONTHS[curMonth]}</DropdownToggle>
        <DropdownMenu>
          {this.props.dateList ? (
            Object.keys(MONTHS).map(month => (
              <DropdownItem
                key={month}
                onClick={() => this.updateMonth(month)}
                disabled={!this.props.dateList[curYear][month]}
              >
                {MONTHS[month]}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem />
          )}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default MonthDropdown;
