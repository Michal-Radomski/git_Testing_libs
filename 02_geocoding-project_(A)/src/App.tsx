import React from "react";
// import globals from "globals";

import "./App.scss";
import StyledMapComponent from "./components/StyledComponent";
// import MapComponent from "./components/MapComponent";
// import { initialPosition } from "./data/constants";
import PompanoBeachRoutesMap from "./components/PompanoBeachRoutesMap";

// console.log(globals.browser);

const App = (): JSX.Element => {
  // const [position, setPosition] = React.useState<Position>(initialPosition);
  // const [position] = React.useState<Position>(initialPosition);

  // React.useEffect(() => {
  //   (async function getLocation(): Promise<void> {
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //         (pos: GeolocationPosition) => {
  //           // console.log("pos:", pos);
  //           const { latitude, longitude, accuracy } = pos.coords;
  //           // console.log({ latitude, longitude });
  //           setPosition({ latitude, longitude, accuracy: Number(accuracy.toFixed(1)) });
  //         },
  //         (err) => {
  //           console.log("err:", err);
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 10000,
  //           maximumAge: 0,
  //         }
  //       );
  //     } else {
  //       console.log("Geolocation is not supported by this browser.");
  //     }
  //   })();
  // }, []);

  return (
    <React.Fragment>
      {/* <StyledMapComponent children={<MapComponent position={position as Position} />} /> */}
      <StyledMapComponent children={<PompanoBeachRoutesMap />} />
    </React.Fragment>
  );
};

export default App;
