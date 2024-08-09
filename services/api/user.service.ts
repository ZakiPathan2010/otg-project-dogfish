import { UserDataResponse } from "@/types/user";
import axios, { AxiosRequestConfig } from "axios";

/** Course Data Api  */
export const getUserDataRequest = async (
  token: string
): Promise<UserDataResponse> => {
  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://abhayamin.com/ocean/dogfish/get-user-data.php?token=${token}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Make API Call
  const response = await axios.request<UserDataResponse>(config);
  return response.data;
};