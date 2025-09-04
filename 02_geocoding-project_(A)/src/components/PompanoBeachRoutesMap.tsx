import React from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { decode } from "@googlemaps/polyline-codec";

const tcURL = import.meta.env.VITE_POMPANO_TC;
const obaURL = import.meta.env.VITE_POMPANO_OBA;
// console.log([tcURL, obaURL]);

const PompanoBeachRoutesMap = (): JSX.Element => {
  const [tcPoints, setTCPoints] = React.useState<null | Point[]>(null);
  const [obaPoints, setOBAPoints] = React.useState<null | [number, number][]>(null);
  const [obaPoints2, setOBAPoints2] = React.useState<null | [number, number][]>(null);

  React.useEffect(() => {
    fetch(tcURL)
      .then((res) => res.json())
      .then((data) => {
        const dataToProceed = data?.routes[2]?.shape[0]?.loc;
        // console.log(dataToProceed);
        setTCPoints(dataToProceed);
      });
  }, []);

  React.useEffect(() => {
    fetch(obaURL)
      .then((res) => res.json())
      .then((data) => {
        const dataToProceed = data?.data?.entry?.polylines[0]?.points;
        const dataToProceed2 = data?.data?.entry?.polylines[1]?.points;
        // console.log(dataToProceed);
        const decoded = decode(dataToProceed as string, 5);
        const decoded2 = decode(dataToProceed2 as string, 5);
        // console.log(decoded);
        setOBAPoints(decoded);
        setOBAPoints2(decoded2);
      });
  }, []);

  const tcOptions = { color: "darkred", weight: 5 };
  const obaOptions = { color: "orangered", weight: 3 };

  return (
    <React.Fragment>
      {tcPoints && obaPoints && obaPoints2 ? (
        <div style={{ width: "100%", height: "100%" }}>
          <MapContainer center={[26.23195, -80.12617]} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Polyline pathOptions={tcOptions} positions={tcPoints?.map((elem) => [elem?.lat, elem?.lon])} />
            <Polyline pathOptions={obaOptions} positions={obaPoints} />
            <Polyline pathOptions={obaOptions} positions={obaPoints2} />
          </MapContainer>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default PompanoBeachRoutesMap;
