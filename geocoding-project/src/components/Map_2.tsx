import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import { convertPosition, decodeValhallaPolyline, getValhallaData, removeDuplicates } from "../utils/utils";
import { PointsComponent, PolylineComponent } from "./MapsComponents";
import { testPoints, zoom } from "../data/constants";

const Map_2 = ({ position }: { position: Position }): JSX.Element => {
  const convertedPosition: LatLngExpression = convertPosition(position);

  const [fetchedData, setFetchedData] = React.useState<FetchedData2 | null>(null);

  React.useEffect(() => {
    (async function (): Promise<void> {
      const res = await getValhallaData(testPoints);
      if (res as FetchedData2) {
        // console.log("res:", res);
        setFetchedData(res);
      }
    })();
  }, []);

  const decodedPoints = React.useMemo((): number[][] | undefined => {
    if (fetchedData) {
      const decodedData = fetchedData?.shapes.map((shape) => decodeValhallaPolyline(shape, 6)).flat(1);
      // console.log("decodedData:", decodedData);
      const filteredData = removeDuplicates(decodedData);
      // console.log("filteredData:", filteredData);
      console.log(2, "fetchedData?.distance:", fetchedData?.distance, "filteredData?.length:", filteredData?.length);
      return filteredData;
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

        {fetchedData && decodedPoints ? <PolylineComponent points={decodedPoints as LatLngTuple[]} color="green" /> : null}
      </MapContainer>
    </React.Fragment>
  );
};

export default Map_2;
