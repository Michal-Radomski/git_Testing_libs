import React from "react";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import L from "leaflet";
import Transitive from "transitive-js";
// console.log("Transitive:", Transitive);

//* Uncaught TypeError: this is undefined: d3.js!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransitiveLayer: React.FC<{ data: any }> = ({ data }: { data: any }) => {
  const map: L.Map = useMap();

  React.useEffect(() => {
    if (map) {
      // Create a container for Transitive.js
      const transitiveContainer = L.DomUtil.create("div", "transitive-container");
      transitiveContainer.style.position = "absolute";
      transitiveContainer.style.top = "0";
      transitiveContainer.style.left = "0";
      transitiveContainer.style.width = "100%";
      transitiveContainer.style.height = "100%";

      // Add the container to the map
      const mapPane = map.getPane("overlayPane");
      mapPane!.appendChild(transitiveContainer);

      // Initialize Transitive.js
      const transitive = new Transitive({
        el: transitiveContainer,
        data: data,
        styles: {
          segment_labels: { fontSize: 12 },
        },
      });

      // Render Transitive.js
      transitive.render();

      // Clean up on component unmount
      return () => {
        if (mapPane?.contains(transitiveContainer)) {
          mapPane?.removeChild(transitiveContainer);
        }
      };
    }
  }, [map, data]);

  return null;
};

const MapPolylines3 = (): React.JSX.Element => {
  const transitiveData = {
    journeys: [
      {
        journey_id: "1",
        segments: [
          { type: "TRANSIT", patterns: ["1"] },
          { type: "WALK", from: { lat: 37.77, lon: -122.43 }, to: { lat: 37.76, lon: -122.42 } },
        ],
      },
    ],
    stops: [
      { stop_id: "1", lat: 37.77, lon: -122.43 },
      { stop_id: "2", lat: 37.76, lon: -122.42 },
    ],
    routes: [{ route_id: "1", patterns: [{ pattern_id: "1", stops: ["1", "2"] }] }],
  };

  return (
    <MapContainer center={[37.77, -122.43]} zoom={13} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <TransitiveLayer data={transitiveData} />
    </MapContainer>
  );
};

export default MapPolylines3;
