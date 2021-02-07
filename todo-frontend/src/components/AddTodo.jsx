import React, { useState } from "react";
import { FormControl, Container, TextField, Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import axios from "axios";

export default function AddTodo({todos, setTodos}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (event) => {
    console.log(title, description);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/todos",
        {
          title,
          description,
          isCompleted: false,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setTodos(todos, response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
