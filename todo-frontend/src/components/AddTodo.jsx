import React, { useState } from "react";
import { FormControl, Container, TextField, Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { addTodos, updateTodos } from "../services/services";

export default function AddTodo({ todos, setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (event) => {
    const body = {
      title,
      description,
      isCompleted: false,
    };
    addTodos(body)
      .then((todo) => {
        setTodos(todos, todo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <FormControl fullWidth={true}>
          <TextField
            onChange={(event) => setTitle(event.target.value)}
            label="Title of the Todo"
            required={true}
            style={{ marginTop: 10 }}
          />
          <TextField
            onChange={(event) => setDescription(event.target.value)}
            label="Description"
            required={true}
            style={{ marginTop: 10 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Icon></Icon>}
            style={{ marginTop: 15 }}
          >
            Add Todo
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}
