// import gtfsToHtml from "gtfs-to-html";
// import gtfsToGeoJSON from "gtfs-to-geojson";
// import gtfsToChart from "gtfs-to-chart";
import { importGtfs, getAgencies, openDb, closeDb } from "gtfs";

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

//* 4. GTFS
const config = {
  sqlitePath: "./db.sqlite3",
  agencies: [
    {
      path: "./kombus.zip",
    },
  ],
  verbose: true,
  logFunction: function (text: string) {
    // Do something with the logs here, like save it or send it somewhere
    console.log("text:", text);
  },
};

try {
  (async function (): Promise<void> {
    await importGtfs(config)
      .then(() => {
        console.log("Successful");
        // process.exit();
      })
      .catch((err: unknown) => {
        console.error(err);
        process.exit(1);
      })
      .finally(() => {
        (async function displayAgencies(): Promise<void> {
          const db = await openDb(config);
          const dbConfig = { db: db };
          const agencies = await getAgencies({}, [], [], dbConfig);
          console.log({ agencies });
          await closeDb(db);
          process.exit();
        })();
      });
  })();

  // Get all agencies
} catch (error) {
  console.log("error:", error);
}
