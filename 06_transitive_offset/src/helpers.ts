import axios from "axios";

export const getRouteData = async (url: string): Promise<PointsData> => {
  const { data } = await axios.get(url);

  const points_0 = data?.routes?.[0]?.shape?.[0].loc as Points[];
  const points_1 = data?.routes?.[0]?.shape?.[1].loc as Points[];
  const color = `#${data?.routes?.[0]?.color}`;
  console.log({ color });

  return { points_0, points_1, color };
};
