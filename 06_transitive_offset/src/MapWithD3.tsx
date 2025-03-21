import React from "react";
import { useMap } from "react-leaflet";
import * as d3 from "d3";
import { Points } from "./Interfaces";

const D3Overlay: React.FC<{ data: Points[] }> = ({ data }) => {
  const map: L.Map = useMap();

  React.useEffect(() => {
    if (map) {
      // Create an SVG layer on top of the map
      const svgLayer: d3.Selection<SVGSVGElement, unknown, null, undefined> = d3
        .select(map.getPanes().overlayPane)
        .append("svg")
        .attr("class", "d3-overlay");

      const g: d3.Selection<SVGGElement, unknown, null, undefined> = svgLayer.append("g").attr("class", "leaflet-zoom-hide");

      // Project geographical coordinates to pixel coordinates
      const projectPoint = (lat: number, lon: number): number[] => {
        const point: L.Point = map.latLngToLayerPoint([lat, lon]);
        return [point.x, point.y];
      };

      // Render circles for each data point
      const updateVisualization = (): void => {
        const bounds = map.getBounds();
        const topLeft: L.Point = map.latLngToLayerPoint(bounds.getNorthWest());
        const bottomRight: L.Point = map.latLngToLayerPoint(bounds.getSouthEast());

        svgLayer
          .style("width", `${bottomRight.x - topLeft.x}px`)
          .style("height", `${bottomRight.y - topLeft.y}px`)
          .style("left", `${topLeft.x}px`)
          .style("top", `${topLeft.y}px`);

        g.attr("transform", `translate(${-topLeft.x},${-topLeft.y})`);

        const circles: d3.Selection<d3.BaseType, Points, SVGGElement, unknown> = g.selectAll("circle").data(data);

        circles
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("fill", "red")
          .merge(circles as unknown as d3.Selection<SVGCircleElement, Points, SVGGElement, unknown>)
          .attr("cx", (d: Points) => projectPoint(d.lat, d.lon)[0])
          .attr("cy", (d: Points) => projectPoint(d.lat, d.lon)[1]);

        circles.exit().remove();
      };

      // Initial render and update on zoom/pan
      updateVisualization();
      map.on("zoomend moveend", updateVisualization);

      // Cleanup on component unmount
      return () => {
        svgLayer.remove();
      };
    }
  }, [map, data]);

  return null;
};

const MapWithD3 = (): React.JSX.Element => {
  // Example data points with lat/lon coordinates
  const data = [
    { lat: 37.7749, lon: -122.4194 }, // San Francisco
    { lat: 34.0522, lon: -118.2437 }, // Los Angeles
    { lat: 40.7128, lon: -74.006 }, // New York City
  ] as Points[];

  return (
    <React.Fragment>
      <D3Overlay data={data} />
    </React.Fragment>
  );
};

export default MapWithD3;
