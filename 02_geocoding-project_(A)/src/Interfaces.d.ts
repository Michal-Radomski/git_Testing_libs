interface Position {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface FetchedData {
  points: string;
  distance: number;
}
interface FetchedData2 {
  shapes: string[];
  distance: number;
}

interface Point {
  lat: number;
  lon: number;
}
