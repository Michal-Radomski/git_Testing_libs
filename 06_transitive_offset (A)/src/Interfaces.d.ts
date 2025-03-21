import "leaflet";

declare module "leaflet" {
  interface PolylineOptions {
    offset?: number; // Add the offset property
  }
}
interface Points {
  lat: number;
  lon: number;
}

interface PointsData {
  [key: string]: Points[] | string;
}

declare module "leaflet-polylineoffset";
