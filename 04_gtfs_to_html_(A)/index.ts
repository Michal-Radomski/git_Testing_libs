// import gtfsToHtml from "gtfs-to-html";
// import gtfsToGeoJSON from "gtfs-to-geojson";
import gtfsToChart from "gtfs-to-chart";

//* 1. GTFS to HTML
// const config = {
//   agencies: [
//     {
//       agencyKey: "Kombus",
//       path: "./kombus.zip",
//     },
//   ],
//   logFunction: function (text: string) {
//     // Do something with the logs here, like save it or send it somewhere
//     console.log(text);
//   },
// };

// gtfsToHtml(config)
//   .then(() => {
//     console.log("HTML Generation Successful");
//     process.exit();
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

//* 2. GTFS to GeoJSON
// const config = {
//   agencies: [
//     {
//       agency_key: "Kombus",
//       path: "./kombus.zip",
//     },
//   ],
//   logFunction: function (text: string) {
//     // Do something with the logs here, like save it or send it somewhere
//     console.log(text);
//   },
// };

// gtfsToGeoJSON(config)
//   .then(() => {
//     console.log("GeoJSON Generation Successful");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//* 3. GTFS to Chart
const config = {
  agencies: [
    {
      agency_key: "Kombus",
      path: "./kombus.zip",
    },
  ],
  logFunction: function (text: string) {
    // Do something with the logs here, like save it or send it somewhere
    console.log(text);
  },
};

gtfsToChart(config)
  .then(() => {
    console.log("Chart Generation Successful");
    process.exit();
  })
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
