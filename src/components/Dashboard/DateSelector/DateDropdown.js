import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class DateDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  updateDay = day => {
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    let newDate = new Date(curYear, curMonth, day);
    this.props.onChangeDate(newDate);
  };
  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    let curDate = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    return (
      <Dropdown
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        className="date-dropdown"
      >
        <DropdownToggle caret>{curDate}</DropdownToggle>
        {!!this.props.dateList && !!this.props.dateList[curYear][curMonth] && (
          <DropdownMenu>
            {Object.keys(this.props.dateList[curYear][curMonth]).map(date => (
              <DropdownItem
                key={date}
                onClick={() => this.updateDay(date)}
                disabled={!this.props.dateList[curYear][curMonth][date]}
              >
                {date}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
}

export default DateDropdown;
