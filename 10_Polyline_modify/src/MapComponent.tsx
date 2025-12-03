import React from "react";
import { type LatLngExpression, type LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Polyline, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

import { polylinePoints } from "./data/points";

function ClickHandler(): null {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      // console.log("Clicked position:", e.latlng.lat, e.latlng.lng);
      console.log("Position:", e.latlng);
    },
  });
  return null; // Renders nothing
}

const MapComponent = (): JSX.Element => {
  const position = [52.410833, 16.938333];

  const [points] = React.useState<[number, number][]>(polylinePoints);
  const [lines, setLines] = React.useState<[number, number][][]>([]);

  React.useEffect(() => {
    const linesToDraw: [number, number][][] = points
      ?.map((_: [number, number], index: number, arr: [number, number][]) => {
        if (index < arr.length - 1) {
          return [arr[index], arr[index + 1]];
        } else {
          return null;
        }
      })
      ?.filter((elem: [number, number][] | null) => elem !== null);

    setTimeout(() => {
      setLines(linesToDraw);
    }, 1000);
  }, [points]);

  const markers: JSX.Element[] = points?.map((point, index: number): JSX.Element => {
    return (
      <Marker position={point as LatLngExpression} key={index}>
        <Popup>{index + 1}</Popup>
      </Marker>
    );
  });

  const linesElements: JSX.Element[] = lines?.map((polyline: [number, number][], index: number) => (
    <Polyline positions={polyline} key={index} />
  ));

  return (
    <React.Fragment>
      <MapContainer
        center={position as LatLngExpression}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}

        {linesElements}
        <ClickHandler />
      </MapContainer>
    </React.Fragment>
  );
};

export default MapComponent;
