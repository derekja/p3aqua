import React, { Component } from "react";
import {
  Map,
  TileLayer,
  ScaleControl,
  ImageOverlay,
  Circle,
  Marker,
  Popup
} from "react-leaflet";
import { mapboxAccessToken } from "../mapboxAccessToken.json";

function Zone(props) {
  if (props.isVisible) {
    return <Circle center={[49.807, -124.811]} radius={8000} />;
  }
  return null;
}

class CoaxMap extends Component {
  onViewportChanged = viewport => {};

  render() {
    return (
      <Map
        onViewportChanged={this.onViewportChanged()}
        viewport={this.props.viewport}
        doubleClickZoom={true}
        onClick={this.props.addMarker}
        minZoom={6}
        maxBounds={[
          [44.887012, -111.137695], // southwest corner
          [59.92199, -144.624023] // northeast corner
        ]}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id="mapbox.satellite"
          accessToken={mapboxAccessToken}
        />

        <ScaleControl imperial={false} maxWidth={200} />
        {this.props.displayChlor && (
          <ImageOverlay
            bounds={[[59.5, -139.001], [47.001, -121.502]]}
            url={this.props.curOverlay}
            opacity={0.9}
          />
        )}

        <Zone isVisible={this.props.zoneVisible} />

        <div id="mapid" className="mapStyle" style={this.props.mapCursor} />
        {this.props.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              {position.lat}, {position.lng}
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default CoaxMap;
