import React from "react";
import { CircleMarker, Popup } from "react-leaflet";

import { redOptions } from "../data/constants";

export const PointsComponent = ({ points }: { points: number[][] }): JSX.Element => {
  const testPoints: JSX.Element[] = points.map((point: number[], index: number): JSX.Element => {
    return (
      <CircleMarker center={[point[0], point[1]]} pathOptions={redOptions} radius={5} key={index}>
        <Popup>{index + 1}</Popup>
      </CircleMarker>
    );
  });

  return <React.Fragment>{testPoints}</React.Fragment>;
};
