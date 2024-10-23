//* https://blog.logrocket.com/generating-pdfs-react/

import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Link, Note, Svg, Polygon } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    color: "black",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
const BasicDocument = (): JSX.Element => {
  return (
    <React.Fragment>
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Hello</Text>
            </View>
            <View style={styles.section}>
              <Text>World</Text>
            </View>
            <Text>
              <Link src="www.facebook.com">Go to Facebook</Link>
            </Text>
            <Text>
              <Note>This will take the user to Facebook</Note>
            </Text>
            <Text>
              <Svg width={"20%"} height={"20%"} style={{ backgroundColor: "blue" }}>
                <Polygon
                  points="100,100 200,100 200,250 100,250"
                  fill="white" //color of background
                  stroke="black" //color of border
                  strokeWidth={10} //border thickness
                />
              </Svg>
            </Text>
          </Page>
        </Document>
      </PDFViewer>
    </React.Fragment>
  );
};
export default BasicDocument;
