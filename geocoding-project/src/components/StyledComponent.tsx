import React from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: auto;
  div.div-map {
    border: 1px solid dimgray;
  }
`;

const StyledMapComponent = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <React.Fragment>
      <MapContainer>
        <div className="div-map">{children}</div>
      </MapContainer>
    </React.Fragment>
  );
};

export default StyledMapComponent;
