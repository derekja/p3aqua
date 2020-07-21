import React from "react";
import YearDropdown from "./YearDropdown";
import MonthDropdown from "./MonthDropdown";
import DateDropdown from "./DateDropdown";
const DatePicker = props => {
  return (
    <div>
      {props.errorMsg && <div className="error">{props.errorMsg}</div>}
      <div className="date-picker">
        <YearDropdown
          isOpen={props.yearDropdownOpen}
          toggle={props.toggleYearDropdown}
          dateList={props.dateList}
          curDate={props.curDate}
          onChangeDate={props.onChangeDate}
        />
        <MonthDropdown
          dateList={props.dateList}
          curDate={props.curDate}
          onChangeDate={props.onChangeDate}
        />
        <DateDropdown
          isOpen={props.dateDropdownOpen}
          toggle={props.toggleDateDropdown}
          dateList={props.dateList}
          curDate={props.curDate}
          onChangeDate={props.onChangeDate}
        />
      </div>
    </div>
  );
};

export default DatePicker;
