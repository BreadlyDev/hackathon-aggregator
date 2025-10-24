import axios from "axios";

const ip = "10.235.186.68:8088";

const api = `http://${ip}`;

const getGoods = async (params = {}) => {
  try {
    const response = await axios.get(`${api}/search/q`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching goods:", error);
    return [];
  }
};

export { getGoods };
