import React, { useMemo, useEffect } from "react";

//azure maps

import {
  AzureMapsProvider,
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  IAzureMapOptions,
  IAzureMapHtmlMarkerEvent,
  IAzureMap,
  IAzureMapControls,
  AzureDataPosition
} from "react-azure-maps";
import SplitPane from "react-split-pane";
import { AuthenticationType, data, Pixel } from "azure-maps-control";

import { azureMapsKey } from "../azureMapsKey.json";

function getCoordinates(e: any) {
  console.log("Clicked on:", e.position);
}

// const maxBounds: Array<Azure> = new BoundingBox(southwestPosition: [
//   [44.887012, -111.137695], // southwest corner
//   [59.92199, -144.624023] // northeast corner
// ]};


let mapRight: any = undefined;
let mapLeft: any = undefined;
let mapRefreshR: any = undefined;
let mapRefreshL: any = undefined;
let debounceTime: any = new Date().getTime();
let debounceInterval = 30;
let mapWid: any = undefined;
let mapHei: any = undefined;
let trueCentre: any = undefined;

const onClick = () => {
  console.log("ASD");
};

const azureHtmlMapMarkerOptions = {
  position: [-110, 45]
};

const mapRefresh = () => {
  let d = new Date();
  let timeSince = d.getTime()-debounceTime;
console.log("timesince: "+timeSince);
console.log("dInterval"+debounceInterval);
  if (timeSince>debounceInterval) {
    debounceTime=d.getTime();

    mapRefreshR();
    mapRefreshL();
    console.log("mapRefresh full");
    const wid = mapRight.map.map.transform.width * 2;
    const hei = mapRight.map.map.transform.height;
    if ((wid!=mapWid)||(hei!=mapHei)) {
      mapWid = mapRight.map.map.transform.width * 2;
      mapHei = mapRight.map.map.transform.height;

      console.log("reset height/width width: "+mapWid+"   height: "+mapHei);
    }
  }
  console.log("mapRefresh");
}

const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [
  { eventName: "click", callback: onClick }
];

const onResize = (size: any) => {
  console.log("resize: "+size);
  mapRefresh();
};


const mapMoveendL = (map: any) => {


  if (mapRight!=undefined) {
    console.log("set mapRight");
console.log(mapRight.map);
console.log(mapRight.map.map.transform._center);
    mapRight.map.map.transform.center.lat= map.map.map.transform._center.lat;
    mapRight.map.map.transform.center.lng= map.map.map.transform._center.lng;
    mapRefresh();
  }
  //map.map.resize(hei, wid, "noloop" );
};

const mapMoveendR = (map: any) => {

  if (mapLeft!=undefined) {

     //set window to full size and center
  mapWid = mapLeft.map.map.transform.width * 2;
  mapHei = mapLeft.map.map.transform.height;

  let lPix: any = new Pixel((mapWid/4), (mapHei/2));
  let lpos: any = mapLeft.map.pixelsToPositions([lPix]);
  console.log(lpos);

  //mapLeft.map.map.transform.center.lng = lpos[0];

    console.log("set mapLeft");
    mapLeft.map.map.transform.center.lat = map.map.map.transform._center.lat;
    mapLeft.map.map.transform.center.lng = map.map.map.transform._center.lng;
    mapRefresh();
  }
  //map.map.resize(hei, wid, "noloop" );
};

  const zoomMapL = (map: any) => {

    mapRight.map.map.transform.zoom = mapLeft.map.map.transform.zoom;

  }


  const zoomMapR = (map: any) => {

    mapLeft.map.map.transform.zoom = mapRight.map.map.transform.zoom;
  }

 const regMapL = (map: any) => {
  mapLeft = map;
  mapRefreshL = mapLeft.map._windowResizeCallback;



  //set window to full size and center
  mapWid = mapLeft.map.map.transform.width * 2;
  mapHei = mapLeft.map.map.transform.height;

  let lPix: any = new Pixel((mapWid/4), (mapHei/2));
  //let rPix: any = new Pixel((3*mapWid/4), 1);
  let lpos: any = mapLeft.map.pixelsToPositions([lPix]);
  //let rpos: any = mapLeft.map.pixelsToPositions([rPix]);
  console.log(lpos);

  let ppos: any = new data.Position(mapLeft.map.map.transform.center.lng, mapLeft.map.map.transform.center.lat,0);
  //mapLeft.map.positionsToPixels(trueCentre);
  console.log(ppos);

  let ppix: any = mapLeft.map.positionsToPixels([ ppos ]);
  console.log(ppix);

  console.log("regMapL  wid: "+mapWid+"    height: "+mapHei)

  console.log(trueCentre);
  mapLeft.map.map.transform.center.lng = trueCentre;
  console.log(mapLeft.map.map.transform.center.lng)


 }
 const regMapR = (map: any) => {
   mapRight = map;
   mapRefreshR = mapRight.map._windowResizeCallback;

   mapRight.map.map.transform.center.lng = trueCentre;
   console.log(mapRight.map.map.transform.center.lng)
  console.log(map)
}

const styles = {
  map: {
    height: "100vh",
    marginBottom: 50
  }
};


const CoaxMap: React.FC = (props:any) => {
  //onViewportChanged = viewport => {};


  const point = new data.Position(-80.01, 35.01);
  const point1 = new data.Position(-100.01, 45.01);

  const azureMapOptionsL = {
    click: props.addMarker,
    moveend: mapMoveendL,
    load: regMapL,
    zoomend: zoomMapL

  };
  const azureMapOptionsR = {
    click: props.addMarker,
    moveend: mapMoveendR,
    load: regMapR,
    zoomend: zoomMapR

  };

  const optionL: IAzureMapOptions = useMemo(() => {

    trueCentre = props.viewport.center[1];

    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: azureMapsKey
      },
      cameraBoundsOptions: {

      },
      center: [props.viewport.center[1],props.viewport.center[0]],
      zoom: props.viewport.zoom,
      view: "Auto"
    };
  }, []);

  const optionR: IAzureMapOptions = useMemo(() => {

    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: azureMapsKey
      },
      cameraBoundsOptions: {

      },
      center: [props.viewport.center[1],props.viewport.center[0]],
      zoom: props.viewport.zoom,
      view: "Auto"
    };
  }, []);

    return (
        <>
        <SplitPane split="vertical" primary="second" onChange={ size => onResize(size) } >
          <div style={styles.map}>
            <AzureMapsProvider>
              <AzureMap options={optionL} events={ azureMapOptionsL }>
                <AzureMapDataSourceProvider id={"LayerExample1 DataSource "}>
                  <AzureMapLayerProvider
                    id={"LayerExample1 Layer"}
                    options={{
                      // URL to an image to overlay. Images hosted on other domains must have CORs enabled.
                      url: props.curOverlayL,
                      // * An array of positions for the corners of the image listed in clockwise order: [top left, top right, bottom right, bottom left].
                      coordinates: [
                        [-139.001, 59.5],
                        [-121.502, 59.5],
                        [-121.502, 47.001],
                        [-139.001, 47.001]
                      ],
                      opacity: 0.8
                    }}
                    type={"ImageLayer"}
                  ></AzureMapLayerProvider>
                </AzureMapDataSourceProvider>
                <AzureMapDataSourceProvider id={"LayerExample1 DataSource2 "}>
                  <AzureMapLayerProvider
                    id={"LayerExample1 Layer2"}
                    options={{
                      opacity: 0.8,
                      iconOptions: {
                        image: "pin-round-red"
                      }
                    }}
                    type={"SymbolLayer"}
                  ></AzureMapLayerProvider>
                  <AzureMapFeature
                    id={"LayerExample1 MapFeature"}
                    type="Point"
                    coordinate={point}
                    properties={{
                      title: "My Title"
                    }}
                  ></AzureMapFeature>
                </AzureMapDataSourceProvider>
                <AzureMapHtmlMarker
                  markerContent={<div className="pulseIcon"></div>}
                  options={azureHtmlMapMarkerOptions}
                  events={eventToMarker}
                />
              </AzureMap>
            </AzureMapsProvider>
        </div>
        <div style={styles.map}>
            <AzureMapsProvider>
                <AzureMap options={optionR} events={azureMapOptionsR}>
                  <AzureMapDataSourceProvider id={"bLayerExample1 DataSource "}>
                    <AzureMapLayerProvider
                      id={"bLayerExample1 Layer"}
                      options={{
                        // URL to an image to overlay. Images hosted on other domains must have CORs enabled.
                        url: props.curOverlayR,
                        // * An array of positions for the corners of the image listed in clockwise order: [top left, top right, bottom right, bottom left].
                        coordinates: [
                          [-139.001, 59.5],
                          [-121.502, 59.5],
                          [-121.502, 47.001],
                          [-139.001, 47.001]
                        ],
                        opacity: 0.8
                      }}
                      type={"ImageLayer"}
                    ></AzureMapLayerProvider>
                  </AzureMapDataSourceProvider>
                  <AzureMapDataSourceProvider id={"bLayerExample1 DataSource2 "}>
                    <AzureMapLayerProvider
                      id={"bLayerExample1 Layer2"}
                      options={{
                        opacity: 0.8,
                        iconOptions: {
                          image: "pin-round-red"
                        }
                      }}
                      type={"SymbolLayer"}
                    ></AzureMapLayerProvider>
                    <AzureMapFeature
                      id={"bLayerExample1 MapFeature"}
                      type="Point"
                      coordinate={point}
                      properties={{
                        title: "My Title"
                      }}
                    ></AzureMapFeature>
                  </AzureMapDataSourceProvider>
                  <AzureMapHtmlMarker
                    markerContent={<div className="pulseIcon"></div>}
                    options={azureHtmlMapMarkerOptions}
                    events={eventToMarker}
                  />
                </AzureMap>
              </AzureMapsProvider>
          </div>
        </SplitPane>
      </>
    );
  };

export default CoaxMap;

/*
      <Map
        // mousemove={e => this.mouseMove(e)}
        // mouseMove={this.props.mouseMove}
        onViewportChanged={this.onViewportChanged()}
        handled in IAzureMapOptions - viewport={this.props.viewport}
        default - doubleClickZoom={true}


        replace getcoordinates - onClick={this.props.addMarker}
        minZoom={6}
atlas.cameraboundsoptions        maxBounds={[
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











      */