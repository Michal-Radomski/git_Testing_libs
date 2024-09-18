import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { decode } from "@googlemaps/polyline-codec";

import { convertPosition, getPathGraphhopper } from "../utils/utils";
import { PointsComponent, PolylineComponent } from "./MapsComponents";
import { testPoints, zoom } from "../data/constants";

const Map_1 = ({ position }: { position: Position }): JSX.Element => {
  const convertedPosition: LatLngExpression = convertPosition(position);

  const [fetchedData, setFetchedData] = React.useState<FetchedData | null>(null);

  React.useEffect(() => {
    (async function (): Promise<void> {
      const res = await getPathGraphhopper(testPoints);
      if (res as FetchedData) {
        // console.log("res:", res);
        setFetchedData(res);
      }
    })();
  }, []);

  const decodedPoints = React.useMemo((): LatLngTuple[] | undefined => {
    if (fetchedData) {
      const decoded = decode(fetchedData?.points as string, 5);
      console.log(1, "fetchedData?.distance:", fetchedData?.distance, "decoded?.length:", decoded?.length);
      return decoded;
    }
  }, [fetchedData]);

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

        {fetchedData && decodedPoints ? <PolylineComponent points={decodedPoints} color="blue" /> : null}
      </MapContainer>
    </React.Fragment>
  );
};

export default Map_1;
