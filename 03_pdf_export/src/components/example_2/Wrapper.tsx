//* https://dev.to/jaymeeu/how-to-generate-custom-pdf-using-react-and-react-pdf-6d4

import React from "react";
import PdfCard from "./PdfCard";

const Wrapper = (): JSX.Element => {
  const cards = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gap: "1rem",
    padding: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  };
  return (
    <React.Fragment>
      <div>
        <h2 style={{ textAlign: "center" }}>List of invoices</h2>
        <div style={cards}>
          <PdfCard title="Oasic ltd Invoice" />
          <PdfCard title="Libra ltd Invoice" />
          <PdfCard title="Xpress ltd Invoice" />
          <PdfCard title="Cardic ltd Invoice" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Wrapper;
