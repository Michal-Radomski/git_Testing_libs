// console.log("test");
import osmtogeojson from "osmtogeojson";
import { ogr2ogr } from "ogr2ogr";

// https://download.geofabrik.de/europe.html
// https://geojson.tools/
// https://ogre.adc4gis.com/

//* https://www.npmjs.com/package/osmtogeojson
console.log("osmtogeojson:", osmtogeojson);

//* https://www.npmjs.com/package/ogr2ogr
console.log("ogr2ogr:", ogr2ogr);

// Promise API
(async function (): Promise<void> {
  // Convert path to GeoJSON.
  // let { data } = await ogr2ogr("./test/osm.pbf");
  // console.log("data:", data);
})();

// ogr2ogr -f GeoJSON filtered_roads.json wielkopolskie-251023.osm.pbf lines -where "highway IN ('motorway','motorway_link','trunk','trunk_link','primary','primary_link','secondary','secondary_link', 'tertiary')"

// ogr2ogr -f GeoJSON rails.json wielkopolskie-251023.osm.pbf lines -where "railway IS NOT NULL"

// ogr2ogr -f GeoJSON output.geojson gis_osm_railways_free_1.shp -t_srs EPSG:4326
// ogr2ogr -f GeoJSON output.geojson gis_osm_roads_free_1.shp -t_srs EPSG:4326
