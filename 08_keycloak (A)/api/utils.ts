import axios from "axios";
import qs from "qs";

export async function getAdminToken(): Promise<string> {
  const data: string = qs.stringify({
    client_id: process.env.VITE_CLIENT_ID as string,
    client_secret: process.env.VITE_CLIENT_SECRET as string,
    grant_type: "client_credentials",
  });

  const config = {
    method: "post",
    url: process.env.VITE_KEYCLOAK_ADMIN_TOKEN_URL,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: data,
  };

  try {
    const response = await axios(config);
    const token = await response.data?.access_token;
    // console.log("token:", token);
    return token;
  } catch (error) {
    console.error("error:", error);
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return null as any;
}
