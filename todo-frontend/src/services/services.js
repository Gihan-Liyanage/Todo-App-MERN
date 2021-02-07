import { http } from "./http";

// Dependency inversion
export const getTodos = async () => {
  return (await http.get("/api/todos")) || [];
};

export const addTodos = async body => {
  return (await http.post("/api/todos", body)) || [];
};

export const removeTodos = async id => {
  return (await http.delete("/api/todos/", id)) || [];
};

export const completeTodos = async id => {
  return (await http.patch("/api/todos/", id)) || [];
};

export const updateTodos = async (id, body) => {
  return (await http.put("/api/todos/", id, body)) || [];
};
