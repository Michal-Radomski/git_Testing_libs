import axios from "axios";
import { LatLngExpression } from "leaflet";

//* Conversion {lat:number, lon:number} -> [lat, lon]
export const convertPosition = (position: Position): LatLngExpression => {
  return [position.latitude, position.longitude];
};

//* Conversion [lat, lon] -> [lon, lat]
const changeLatLon = (points: number[][]): number[][] => {
  const changedPoints = points.map((point) => [point[1], point[0]]);
  return changedPoints;
};

export const getPathGraphhopper = async (points: number[][]): Promise<FetchedData | null> => {
  // console.log("points:", points);
  const apiKey = import.meta.env.VITE_GRAPHHOPPER_API_KEY;
  // console.log({ apiKey });

  const url = `https://graphhopper.com/api/1/route?key=${apiKey}`;
  const data = {
    elevation: false,
    points: changeLatLon(points),
    profile: "car",
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const {
      data: {
        paths: [{ points, distance }],
      },
    }: { data: { paths: [FetchedData] } } = response;
    // console.log({ points, distance });
    return { points, distance };
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
