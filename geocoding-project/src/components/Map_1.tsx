import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import { convertPosition, getPathGraphhopper } from "../utils/utils";
import { PointsComponent } from "./MapsComponents";
import { testPoints, zoom } from "../data/constants";

const Map_1 = ({ position }: { position: Position }): JSX.Element => {
  const convertedPosition: LatLngExpression = convertPosition(position);

  const [fetchedData, setFetchedData] = React.useState<FetchedData | null>(null);
  console.log("fetchedData:", fetchedData);

  React.useEffect(() => {
    (async function () {
      const res = await getPathGraphhopper(testPoints);
      if (res as FetchedData) {
        // console.log("res:", res);
        setFetchedData(res);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <MapContainer center={convertedPosition} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={convertedPosition}>
          {position?.accuracy ? <Popup>Accuracy: {position?.accuracy || "n/a"}</Popup> : null}
        </Marker>

        <PointsComponent points={testPoints} />
      </MapContainer>
    </React.Fragment>
  );
};

export default Map_1;
