import React from "react";

import "./App.scss";
import MapComponent from "./MapComponent";
import StyledMapComponent from "./StyledComponent";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <StyledMapComponent children={<MapComponent />} />
    </React.Fragment>
  );
};

export default App;
