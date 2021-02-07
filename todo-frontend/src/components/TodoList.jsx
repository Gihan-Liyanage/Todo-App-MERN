import React from "react";
import AddTodo from "./AddTodo";
import Todo from "../components/Todo";

export default function TodoList({ todos, setTodos }) {
  return (
    <div>
      <AddTodo todos={todos} setTodos={setTodos} />
      {todos
        ?.filter((todo) => todo.isCompleted === false)
        .map((todo) => (
          <Todo todo={todo} todos={todos} setTodos={setTodos} />
        ))}
    </div>
  );
}
