import React from "react";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet-polylineoffset";
// import * as LL from "leaflet-polylineoffset";
// console.log("LL:", LL);

const MapPolylines = (): React.JSX.Element => {
  const leafletMap: L.Map = useMap();

  // React.useEffect(() => {
  //   if (leafletMap) {
  //     const latlngs = [
  //       [45.51, -122.68],
  //       [37.77, -122.43],
  //       [34.04, -118.2],
  //       [40.78, -73.91],
  //       [41.83, -87.62],
  //       [32.76, -96.72],
  //     ] as unknown as LatLngExpression[][];

  //     const polyline = L.polyline(latlngs, { color: "orange" });
  //     polyline.addTo(leafletMap);
  //     leafletMap.fitBounds(polyline.getBounds());
  //   }
  // }, [leafletMap]);

  React.useEffect(() => {
    if (leafletMap) {
      const latlngs = [
        [48.8508, 2.3455],
        [48.8497, 2.3504],
        [48.8494, 2.35654],
      ] as unknown as LatLngExpression[][];

      const polyline = L.polyline(latlngs, { offset: 0, color: "red" });
      const polyline2 = L.polyline(latlngs, { offset: 10, color: "magenta" });
      const polyline3 = L.polyline(latlngs, { offset: -10, color: "green" });
      polyline.addTo(leafletMap);
      polyline2.addTo(leafletMap);
      polyline3.addTo(leafletMap);
      // leafletMap.fitBounds(polyline.getBounds());
    }
  }, [leafletMap]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <React.Fragment>{null as any}</React.Fragment>;
};

export default MapPolylines;
