import axios from "axios";
import { LatLngExpression } from "leaflet";

//* Conversion {lat:number, lon:number} -> [lat, lon]
export const convertPosition = (position: Position): LatLngExpression => {
  return [position.latitude, position.longitude];
};

const reverseConvertPoints = (points: number[][]): Point[] => {
  const reversedPoints = points.map((point) => {
    return { lat: point[0], lon: point[1] };
  });
  return reversedPoints;
};

//* Conversion [lat, lon] -> [lon, lat]
const changeLatLon = (points: number[][]): number[][] => {
  const changedPoints = points.map((point) => [point[1], point[0]]);
  return changedPoints;
};

//* Get Graphhopper data
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

//* Get Valhalla data
export const getValhallaData = async (points: number[][]): Promise<FetchedData2 | null> => {
  // console.log("points:", points);
  const reversedPoints = reverseConvertPoints(points);
  // console.log("reversedPoints:", reversedPoints);

  const dataToFetch = {
    locations: reversedPoints,
    costing: "bus",
    units: "kilometers",
  };

  // const baseUrl = "http://goeuropa.net:8002/route";
  const baseUrl = "https://valhalla1.openstreetmap.de/route";
  const params: { json: string } = {
    json: JSON.stringify(dataToFetch),
  };

  try {
    const response = await axios.get(baseUrl, { params });
    // console.log("Directions:", response.data);
    const {
      data: {
        trip: {
          legs,
          summary: { length },
        },
      },
    }: { data: { trip: { legs: [{ shape: string }]; summary: { length: number } } } } = response;
    const shapes: string[] = legs.map((leg) => leg.shape);
    // console.log(shapes, length);
    return { shapes, distance: length * 1000 };
  } catch (error) {
    console.error("Error fetching directions:", error);
    return null;
  }
};

//* Decode Valhalla Polyline string
export const decodeValhallaPolyline = (encoded: string, precision = 6): number[][] => {
  const factor: number = Math.pow(10, precision);
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates = [] as number[][];

  while (index < encoded.length) {
    let result: number = 0;
    let shift: number = 0;
    let byte: number;

    // Decode latitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const latitudeChange: number = result & 1 ? ~(result >> 1) : result >> 1;
    lat += latitudeChange;

    result = 0;
    shift = 0;

    // Decode longitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const longitudeChange: number = result & 1 ? ~(result >> 1) : result >> 1;
    lng += longitudeChange;

    // Store the decoded coordinates
    coordinates.push([lat / factor, lng / factor]);
  }

  return coordinates;
};

//* Remove coordinates in coordinates data
export const removeDuplicates = (dataToFilter: number[][]): number[][] => {
  const filteredData = Array.from(new Set(dataToFilter.map((elem: number[]) => JSON.stringify(elem)))).map((str) =>
    JSON.parse(str)
  ) as number[][];
  return filteredData;
};
