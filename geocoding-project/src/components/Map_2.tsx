import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { convertPosition } from "../utils/utils";
import { PointsComponent } from "./MapsComponents";
import { testPoints, zoom } from "../data/constants";
const Map_2 = ({ position }: { position: Position }): JSX.Element => {
  const convertedPosition = convertPosition(position);

  return (
    <React.Fragment>
      <MapContainer center={convertedPosition} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={convertedPosition}>
          <Popup>Accuracy: {position?.accuracy || "n/a"}</Popup>
        </Marker>

        <PointsComponent points={testPoints} />
      </MapContainer>
    </React.Fragment>
  );
};

export default Map_2;
