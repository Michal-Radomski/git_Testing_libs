import React from "react";
import styled from "styled-components";

import "./App.scss";
import MapComponent from "./MapComponent";

const MapContainerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <MapContainerContainer>
        <MapComponent />
      </MapContainerContainer>
    </React.Fragment>
  );
};

export default App;
