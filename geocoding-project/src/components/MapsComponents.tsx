import React from "react";
import { CircleMarker, Polyline, Popup } from "react-leaflet";

import { blueOptions, radius, redOptions } from "../data/constants";
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

export const PolylineComponent = ({ points }: { points: LatLngTuple[] }): JSX.Element => {
  return <Polyline pathOptions={blueOptions} positions={points} />;
};
