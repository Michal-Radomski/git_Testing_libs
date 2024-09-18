import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { convertPosition } from "../utils/utils";
const Map2 = ({ position }: { position: Position }): JSX.Element => {
  const convertedPosition = convertPosition(position);

  return (
    <React.Fragment>
      <MapContainer center={convertedPosition} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={convertedPosition}>
          <Popup>Accuracy: {position?.accuracy}</Popup>
        </Marker>
      </MapContainer>
    </React.Fragment>
  );
};

export default Map2;
