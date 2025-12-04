import React from "react";
import { type LatLngExpression, type LeafletMouseEvent, LatLng, Marker as LeafletMarker, type Map } from "leaflet";
import { Polyline, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

import { polylinePoints } from "./data/points";

function ClickHandler({
  checkedLineIndex,
  points,
  setPoints,
}: {
  checkedLineIndex: number;
  points: [number, number][];
  setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>;
}): null {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      if (checkedLineIndex >= 0) {
        // console.log("Position:", e.latlng);
        const newPoint = [e.latlng.lat, e.latlng.lng];
        // console.log("newPoint:", newPoint);

        const newPoints = [...points.slice(0, checkedLineIndex), newPoint, ...points.slice(checkedLineIndex)] as [
          number,
          number
        ][];
        setPoints(newPoints);
      }
    },
  });
  return null; // Renders nothing
}

const MapComponent = (): JSX.Element => {
  const position = [52.410833, 16.938333];

  const [mapView, setMapView] = React.useState<Map | null>(null);
  const [points, setPoints] = React.useState<[number, number][]>(polylinePoints);
  const [lines, setLines] = React.useState<[number, number][][]>([]);
  const [checkedLineIndex, setCheckedLineIndex] = React.useState<number>(-1);
  // console.log("points:", points);

  React.useEffect(() => {
    const linesToDraw: [number, number][][] = points
      ?.map((_: [number, number], index: number, arr: [number, number][]) => {
        if (index < arr.length - 1) {
          return [arr[index], arr[index + 1]];
        } else {
          return null;
        }
      })
      ?.filter((elem: [number, number][] | null) => elem !== null);

    setTimeout(() => {
      setLines(linesToDraw);
    }, 1000);
  }, [points]);

  //* V1
  // const markers: JSX.Element[] = points?.map((point, index: number): JSX.Element => {
  //   return (
  //     <Marker position={point as LatLngExpression} key={index}>
  //       <Popup>{index + 1}</Popup>
  //     </Marker>
  //   );
  // });

  //* V2
  const draggableMarkers: JSX.Element[] = points.map((pos: [number, number], index: number): JSX.Element => {
    // console.log("index:", index);

    return (
      <DraggableMarker
        index={index}
        key={index}
        position={pos as LatLngExpression}
        onDragEnd={(newPosition: LatLng) => {
          // console.log("newPosition:", newPosition);
          setPoints((prev) => {
            const newPoints = [...prev];
            newPoints[index] = [newPosition?.lat, newPosition?.lng];
            return newPoints;
          });
        }}
      />
    );
  });

  const linesElements: JSX.Element[] = lines?.map(
    (polyline: [number, number][], index: number): JSX.Element => (
      <Polyline
        pathOptions={{ color: index === checkedLineIndex ? "orange" : "blue" }}
        eventHandlers={{
          click: () => {
            // console.log("index:", index);
            if (checkedLineIndex !== index) {
              setCheckedLineIndex(index);
            } else {
              setCheckedLineIndex(-1);
            }
          },
        }}
        positions={polyline}
        key={index}
      />
    )
  );

  return (
    <React.Fragment>
      {
        <MapContainer
          ref={setMapView}
          center={position as LatLngExpression}
          zoom={15}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {markers} */}
          {mapView ? draggableMarkers : null}

          {mapView ? linesElements : null}
          <ClickHandler checkedLineIndex={checkedLineIndex} points={points} setPoints={setPoints} />
        </MapContainer>
      }
    </React.Fragment>
  );
};

export default MapComponent;

const DraggableMarker = ({
  position,
  index,
  onDragEnd,
}: {
  position: LatLngExpression;
  index: number;
  onDragEnd: (newPosition: LatLng) => void;
}): JSX.Element => {
  const [currentPosition, setCurrentPosition] = React.useState<LatLngExpression>(position);
  // console.log("currentPosition:", currentPosition);

  const markerRef = React.useRef<LeafletMarker>(null);

  const eventHandlers = React.useMemo(
    () => ({
      dragend(): void {
        const marker = markerRef.current;
        if (marker !== null) {
          const newPosition: LatLng = marker.getLatLng();
          // console.log("newPosition:", newPosition);
          setCurrentPosition(newPosition);
          onDragEnd(newPosition);
        }
      },
    }),
    [onDragEnd]
  );

  return (
    <Marker draggable={true} eventHandlers={eventHandlers} position={currentPosition} ref={markerRef}>
      <Popup>{index + 1}</Popup>
    </Marker>
  );
};
