import { http } from "./http";

// Dependency inversion 
export const getTodos = async () => {
  return (await http.get("/api/todos")) || [];
};
