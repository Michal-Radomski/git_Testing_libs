import React from "react";
// import globals from "globals";

import "./App.scss";
import StyledMapComponent from "./components/StyledComponent";
import Map_1 from "./components/Map_1";
import Map_2 from "./components/Map_2";

// console.log(globals.browser);
// const testEnv = import.meta.env.VITE_TEST_ENV;
// console.log({ testEnv });

const App = (): JSX.Element => {
  // const [position, setPosition] = React.useState<Position>({ latitude: 54.40414 longitude: 18.60747 });
  const [position] = React.useState<Position>({ latitude: 54.40414, longitude: 18.60747 });

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
      <StyledMapComponent children={<Map_1 position={position as Position} />} />
      <StyledMapComponent children={<Map_2 position={position as Position} />} />
    </React.Fragment>
  );
};

export default App;
