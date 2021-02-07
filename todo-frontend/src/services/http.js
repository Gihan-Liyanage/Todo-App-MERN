import axios from "axios";

export const http = {
  get: async (path) => {
    try {
      const response = await axios.get("http://localhost:5000" + path, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  post: async (path, body) => {},
};
