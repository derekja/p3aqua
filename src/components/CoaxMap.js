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

//class CoaxMap extends Component {
//onViewportChanged = viewport => {props.viewport};
const CoaxMap = (props) => {

    return (
      <Map

        //onViewportChanged={this.onViewportChanged()}
        viewport={props.viewport}
        doubleClickZoom={true}
        onClick={props.addMarker}
        minZoom={6}
        maxBounds={[
          [44.887012, -111.137695], // southwest corner
          [59.92199, -144.624023] // northeast corner
        ]}
        style={{ cursor: props.pointer }}
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
        {props.displayChlor && (
          <ImageOverlay
            bounds={[[59.5, -139.001], [47.001, -121.502]]}
            url={
              props.curOverlay

            }
            opacity={0.9}
            onLoad={props.loading}
            onAdd={() => {
              console.log("wheee add! this is the fastest one");
            }}
          />
        )}

        {props.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              {position.lat}, {position.lng}
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }


export default CoaxMap;
