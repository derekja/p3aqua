import React, { Component, useState } from "react";
import { NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import LayerModal from "./LayerModal";


// the whole implementation of this is garbage
const LayerPicker: React.FC = (props:any) =>  {

  const [ dropdownOpen, setDropdownOpen ] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);


 const handleChange = (event:any) => {
    if (event.target.value === "chlor") {
      props.toggleChlor(true);
    } else {
      props.toggleChlor(false);
    }
  };

    if (!props.mobileVersion) {
      return (
        <NavItem id="nav_data" className="layers">
          <i className="fas fa-layer-group" />
          <form id="dataproducts">
        <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle} size="lg" className="dd">
           <DropdownToggle caret>
            Data Source
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Data Sources</DropdownItem>
            <DropdownItem>Some Action</DropdownItem>
            <DropdownItem disabled>Action (disabled)</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        </form>
        </NavItem>
      );
    }
    return (
      <LayerModal
        displayChlor={props.displayChlor}
        onChange={handleChange}
      />
    );
  }


export default LayerPicker;

/*
        <NavItem id="nav_data" className="layers">
          <i className="fas fa-layer-group" />
          <form id="dataproducts">
            <div className="layer">
              <input
                type="radio"
                label="Dissolved Organic Matter"
                id="layer_orgm"
                value="orgm"
                name="layer"
                checked={!this.props.displayChlor}
                onChange={this.handleChange}
              />
              <label htmlFor="layer_orgm">Dissolved Organic Matter</label>
            </div>
            <div className="layer">
              <input
                type="radio"
                label="Chlorophyll"
                id="layer_chlor"
                value="chlor"
                name="layer"
                checked={this.props.displayChlor}
                onChange={this.handleChange}
              />
              <label htmlFor="layer_chlor">Chlorophyll</label>
            </div>
          </form>
        </NavItem>
        */