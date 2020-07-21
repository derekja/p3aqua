import React, { Component } from "react";
import {
  Map,
  TileLayer,
  ScaleControl,
  ImageOverlay,
  Marker,
  Popup
} from "react-leaflet";
//import { mapboxAccessToken } from "../mapboxAccessToken.json";
import { azureMapsKey } from "../azureMapsKey.json";

class CoaxMap extends Component {
  onViewportChanged = viewport => {};

  render() {
    console.log("wwoww: ",azureMapsKey);
    return (
      <Map
        // mousemove={e => this.mouseMove(e)}
        // mouseMove={this.props.mouseMove}
        onViewportChanged={this.onViewportChanged()}
        viewport={this.props.viewport}
        doubleClickZoom={true}
        onClick={this.props.addMarker}
        minZoom={6}
        maxBounds={[
          [44.887012, -111.137695], // southwest corner
          [59.92199, -144.624023] // northeast corner
        ]}
        style={{ cursor: this.props.pointer }}
      >
        <TileLayer
         attribution='&amp;copy 1992 - 2020 TomTom'
         url="https://atlas.microsoft.com/map/tile?subscription-key={subscriptionKey}&api-version=2.0&zoom={z}&x={x}&y={y}&tileSize=256&tilesetId={tilesetId}&language={language}&view={view}"
         id="azure.satellite"
         subscriptionKey= {azureMapsKey}
         tilesetId= "microsoft.imagery"
         language = "en-US"
         view = "Auto"
        />


        <ScaleControl imperial={false} maxWidth={200} />
        {this.props.displayChlor && (
          <ImageOverlay
            bounds={[[59.5, -139.001], [47.001, -121.502]]}
            url={
              this.props.curOverlay
              // <img src={this.props.curOverlay} onLoad={this.props.loading} />
              // <MapImg
              //   imageURL={this.props.curOverlay}
              //   onLoad={this.props.loading}
              // />
            }
            opacity={0.9}
            onLoad={this.props.loading}
            onAdd={() => {
              console.log("wheee add! this is the fastest one");
            }}
          />
        )}

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
