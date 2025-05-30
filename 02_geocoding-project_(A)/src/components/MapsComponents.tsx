import React from "react";
import { CircleMarker, Polyline, Popup } from "react-leaflet";

import { radius, redOptions } from "../data/constants";
import { LatLngTuple } from "leaflet";

export const PointsComponent = ({ points }: { points: number[][] }): JSX.Element => {
  const testPoints: JSX.Element[] = points.map((point: number[], index: number): JSX.Element => {
    return (
      <CircleMarker center={[point[0], point[1]]} pathOptions={redOptions} radius={radius} key={index}>
        <Popup>{index + 1}</Popup>
      </CircleMarker>
      // <CircleMarker center={[point[0], point[1]]} pathOptions={redOptions} radius={radius} key={index} />
    );
  });

  return <React.Fragment>{testPoints}</React.Fragment>;
};

export const PolylineComponent = ({
  points,
  color,
  weight,
  api,
}: {
  points: LatLngTuple[];
  color: string;
  weight: number;
  api: string;
}): JSX.Element => {
  const pathOptions = { color: color, weight: weight };
  // console.log("points:", points);
  const dashArray = "10, 1";

  return <Polyline pathOptions={pathOptions} positions={points} dashArray={dashArray} children={<Popup>{api}</Popup>} />;
};
