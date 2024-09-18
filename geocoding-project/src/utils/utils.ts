import { LatLngExpression } from "leaflet";

export const convertPosition = (position: Position): LatLngExpression => {
  return [position.latitude, position.longitude];
};
