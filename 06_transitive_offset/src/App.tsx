import React from "react";

import "./App.scss";
import MapComponent from "./MapComponent";
import StyledMapComponent from "./StyledComponent";
// import MapPolylines3 from "./MapPolylines3"; //* Doesn't work!

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <StyledMapComponent children={<MapComponent />} />
      {/* <MapPolylines3 /> */}
    </React.Fragment>
  );
};

export default App;
