import React from "react";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet-polylineoffset";

import { url_1, url_2 } from "./data/data";
import { getRouteData } from "./helpers";
import { PointsData } from "./Interfaces";

const MapPolylines2 = (): React.JSX.Element => {
  const leafletMap: L.Map = useMap();

  const [points172, setPoints172] = React.useState<PointsData | null>(null);
  const [points212, setPoints212] = React.useState<PointsData | null>(null);
  // console.log("points172:", points172, "points212:", points212);

  React.useEffect(() => {
    (async function (): Promise<void> {
      const dataPoints172 = await getRouteData(url_1);
      const dataPoints212 = await getRouteData(url_2);
      setPoints172(dataPoints172);
      setPoints212(dataPoints212);
    })();
  }, []);

  React.useEffect(() => {
    if (leafletMap && points172 && points212) {
      const polyline172_0 = L.polyline(points172?.points_0 as unknown as LatLngExpression[], {
        offset: 0,
        color: points172?.color as string,
        weight: 3,
      });

      const polyline172_1 = L.polyline(points172?.points_1 as unknown as LatLngExpression[], {
        offset: 3,
        color: points172?.color as string,
        weight: 3,
      });

      const polyline212_0 = L.polyline(points212?.points_0 as unknown as LatLngExpression[], {
        offset: -3,
        color: points212?.color as string,
        weight: 3,
      });
      const polyline212_1 = L.polyline(points212?.points_1 as unknown as LatLngExpression[], {
        offset: -6,
        color: points212?.color as string,
        weight: 3,
      });
      polyline172_0.addTo(leafletMap);
      polyline172_1.addTo(leafletMap);
      polyline212_0.addTo(leafletMap);
      polyline212_1.addTo(leafletMap);

      polyline172_0.on("click", function (e: L.LeafletMouseEvent) {
        L.popup().setLatLng(e.latlng).setContent("172_0").openOn(leafletMap);
      });
      polyline172_1.on("click", function (e: L.LeafletMouseEvent) {
        L.popup().setLatLng(e.latlng).setContent("172_1").openOn(leafletMap);
      });
      polyline212_0.on("click", function (e: L.LeafletMouseEvent) {
        L.popup().setLatLng(e.latlng).setContent("212_0").openOn(leafletMap);
      });
      polyline212_1.on("click", function (e: L.LeafletMouseEvent) {
        L.popup().setLatLng(e.latlng).setContent("212_1").openOn(leafletMap);
      });
    }
  }, [leafletMap, points172, points212]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <React.Fragment>{null as any}</React.Fragment>;
};

export default MapPolylines2;
