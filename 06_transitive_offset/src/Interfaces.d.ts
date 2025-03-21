interface Points {
  lat: number;
  lon: number;
}

interface PointsData {
  [key: string]: Points[] | string;
}

declare module "leaflet-polylineoffset";
