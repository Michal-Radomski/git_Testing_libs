import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// import { LatLngExpression } from "leaflet";

import { initialPosition, url_1, url_2 } from "./data/data";
import { getRouteData } from "./helpers";
import MapPolylines from "./MapPolylines";
import MapPolylines2 from "./MapPolylines2";
import { PointsData } from "./Interfaces";

const MapComponent = (): React.JSX.Element => {
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

  //* V1
  // const Polyline172_0 = (): React.JSX.Element => (
  //   <Polyline
  //     positions={points172?.points_0 as unknown as LatLngExpression[]}
  //     pathOptions={{ color: points172?.color as string, weight: 4 }}
  //     children={<Popup>172_0</Popup>}
  //   />
  // );
  // const Polyline172_1 = (): React.JSX.Element => (
  //   <Polyline
  //     positions={points172?.points_1 as unknown as LatLngExpression[]}
  //     pathOptions={{ color: points172?.color as string, weight: 4 }}
  //     children={<Popup>172_1</Popup>}
  //   />
  // );
  // const Polyline212_0 = (): React.JSX.Element => (
  //   <Polyline
  //     positions={points212?.points_0 as unknown as LatLngExpression[]}
  //     pathOptions={{ color: points212?.color as string, weight: 4 }}
  //     children={<Popup>212_0</Popup>}
  //   />
  // );
  // const Polyline212_1 = (): React.JSX.Element => (
  //   <Polyline
  //     positions={points212?.points_1 as unknown as LatLngExpression[]}
  //     pathOptions={{ color: points212?.color as string, weight: 4 }}
  //     children={<Popup>212_1</Popup>}
  //   />
  // );

  return (
    <React.Fragment>
      {points172 && points212 ? (
        <MapContainer
          center={[initialPosition?.latitude, initialPosition.longitude]}
          zoom={10}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* //* V1 */}
          {/* <Polyline172_0 />
          <Polyline212_0 />
          <Polyline172_1 />
          <Polyline212_1 /> */}

          <MapPolylines />

          {/* //* V2 */}
          <MapPolylines2 />
        </MapContainer>
      ) : null}
    </React.Fragment>
  );
};

export default MapComponent;
