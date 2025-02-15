import axios from "axios";
import Cookies from "js-cookie";

const port = "http://localhost:3000";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return { Authorization: `Bearer ${token}` };
};

// GET request
export const makeAuthorizedGetRequest = async (route: string) => {
  try {
    const response = await axios.get(`${port}${route}`, {
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error("GET request error:", error);
  }
};

// POST request
export const makeAuthorizedPostRequest = async (
  route: string,
  data: object
) => {
  try {
    const response = await axios.post(`${port}${route}`, data, {
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("POST request error:", error);
  }
};

// PATCH request
export const makeAuthorizedPatchRequest = async (
  route: string,
  data: object
) => {
  try {
    const response = await axios.patch(`${port}${route}`, data, {
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("PATCH request error:", error);
  }
};

// DELETE request
export const makeAuthorizedDeleteRequest = async (
  route: string,
  data: object
) => {
  // console.log(data);
  try {
    const response = await axios.delete(`${port}${route}`, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json", 
      },
      data: data,
    });
    return response;
  } catch (error) {
    console.error("DELETE request error:", error);
  }
};
