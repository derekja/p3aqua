import React from "react";
import { NavItem } from "reactstrap";
import DatePicker from "./DatePicker";
import DateModal from "./DateModal";

const DateSelector = props => {
  if (!props.mobileVersion) {
    return (
      <NavItem id="nav_cal">
        {props.dateList && (
          <DatePicker
            dateList={props.dateList}
            curDate={props.curDate}
            onChangeDate={props.onChangeDate}
            errorMsg={props.errorMsg}
          />
        )}
      </NavItem>
    );
  } else {
    return (
      <DateModal
        dateList={props.dateList}
        curDate={props.curDate}
        onChangeDate={props.onChangeDate}
        errorMsg={props.errorMsg}
      />
    );
  }
};

export default DateSelector;
