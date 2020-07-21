import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class YearDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  updateYear = year => {
    let curDay = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let newDate = new Date(year, curMonth, curDay);
    this.props.onChangeDate(newDate);
  };
  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };
  render() {
    return (
      <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.curDate.getFullYear()}
        </DropdownToggle>
        {this.props.dateList && (
          <DropdownMenu>
            {Object.keys(this.props.dateList).map(year => (
              <DropdownItem key={year} onClick={() => this.updateYear(year)}>
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
}

export default YearDropdown;
