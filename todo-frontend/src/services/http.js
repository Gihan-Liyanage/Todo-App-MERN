import axios from "axios";
// Includes all the API calls related to todos
export const http = {
  get: async path => {
    try {
      const response = await axios.get("http://localhost:5000" + path, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  post: async (path, body) => {
    try {
      const response = await axios.post("http://localhost:5000" + path, body, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  delete: async (path, id) => {
    try {
      const response = await axios.delete("http://localhost:5000" + path + id, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  patch: async (path, id) => {
    try {
      console.log(id);
      const response = await axios.patch("http://localhost:5000" + path + id);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  put: async (path, id, body) => {
    try {
      console.log(body);
      const response = await axios.put(
        "http://localhost:5000" + path + id,
        body,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
