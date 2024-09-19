import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { decode } from "@googlemaps/polyline-codec";

import {
  convertPosition,
  decodeValhallaPolyline,
  getPathGraphhopper,
  getValhallaData,
  removeDuplicates,
} from "../utils/utils";
import { PointsComponent, PolylineComponent } from "./MapsComponents";
import { REMOVE_DUPLICATES, testPoints, zoom } from "../data/constants";

const MapComponent = ({ position }: { position: Position }): JSX.Element => {
  const convertedPosition: LatLngExpression = convertPosition(position);

  const [fetchedData, setFetchedData] = React.useState<FetchedData | null>(null);
  const [fetchedData2, setFetchedData2] = React.useState<FetchedData2 | null>(null);

  //* 1. Graphhopper
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

  //* 2. Valhalla
  React.useEffect(() => {
    (async function (): Promise<void> {
      const res = await getValhallaData(testPoints);
      if (res as FetchedData2) {
        // console.log("res:", res);
        setFetchedData2(res);
      }
    })();
  }, []);

  const decodedPoints2 = React.useMemo((): number[][] | undefined => {
    if (fetchedData2) {
      const decodedData = fetchedData2?.shapes.map((shape) => decodeValhallaPolyline(shape, 6)).flat(1);
      // console.log("decodedData:", decodedData);

      //* Remove duplicates or not
      const filteredData = REMOVE_DUPLICATES ? removeDuplicates(decodedData) : decodedData;
      // console.log("filteredData:", filteredData);
      console.log(2, "fetchedData2?.distance:", fetchedData2?.distance, "filteredData?.length:", filteredData?.length);
      return filteredData;
    }
  }, [fetchedData2]);

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

        {fetchedData && decodedPoints && decodedPoints2 ? (
          <React.Fragment>
            <PolylineComponent points={decodedPoints} color="blue" weight={7} api={"Graphhopper"} />
            <PolylineComponent points={decodedPoints2 as LatLngTuple[]} color="orange" weight={3} api={"Valhalla"} />
          </React.Fragment>
        ) : null}
      </MapContainer>
    </React.Fragment>
  );
};

export default MapComponent;
