import React, { Component } from "react";
import { NavItem } from "reactstrap";
import LayerModal from "./LayerModal";

// the whole implementation of this is garbage
class LayerPicker extends Component {
  handleChange = event => {
    if (event.target.value === "chlor") {
      this.props.toggleChlor(true);
    } else {
      this.props.toggleChlor(false);
    }
  };
  render() {
    if (!this.props.mobileVersion) {
      return (
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
      );
    }
    return (
      <LayerModal
        displayChlor={this.props.displayChlor}
        onChange={this.handleChange}
      />
    );
  }
}

export default LayerPicker;
