interface Position {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface FetchedData {
  points: string;
  distance: number;
}
