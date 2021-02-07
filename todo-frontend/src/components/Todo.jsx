import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, ButtonGroup, Button } from "@material-ui/core";
import { Create, Delete, CheckCircle } from "@material-ui/icons";
import { removeTodos, completeTodos, updateTodos } from "../services/services";
import { currentDate } from "../utils/currentDate";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  todoStyle: {
    margin: "20px auto",
    padding: "20px",
    border: "2px solid #bdbdbd",
    borderRadius: "9px",
    display: "flex",
    justifyContent: "space-between",
  },
  moreStyle: {
    color: "#8f8f8f",
  },
  isComplete: {
    color: "green",
  },
  checked: {
    textDecoration: "line-through",
  },
});

const Todo = ({ todo, setTodos, todos }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleOnUpdateClick = (id) => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  // Update function
  const handleClose = (id) => {
    const body = {
      title: title,
      description: description,
      isCompleted: false,
      date: currentDate()
    };
    updateTodos(id, body)
      .then((updatedTodo) => {
        const selectedTodos = todos?.filter((todo) => todo._id !== id);
        setTodos(selectedTodos, updatedTodo);
        console.log(updatedTodo);
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  const handleDelete = async (id) => {
    removeTodos(id)
      .then(() => {
        const selectedTodos = todos?.filter((todo) => todo._id !== id);
        setTodos(selectedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheck = async (id) => {
    completeTodos(id)
      .then((updatedtodo) => {
        const selectedTodos = todos?.filter((todo) => todo._id !== id);
        setTodos(selectedTodos, updatedtodo);
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={classes.todoStyle}>
        <div>
          {todo.isCompleted ? (
            <Typography variant="subtitle1" className={classes.checked}>
              {todo.title}
            </Typography>
          ) : (
            <Typography variant="subtitle1">{todo.title}</Typography>
          )}
          <Typography variant="body2" className={classes.moreStyle}>
            Description: {todo.description}
          </Typography>
          <Typography variant="body2" className={classes.moreStyle}>
            Added: {todo.date}
          </Typography>
        </div>
        <div>
          {todo.isCompleted === true ? (
            <ButtonGroup
              size="small"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => handleDelete(todo._id)}>
                <Delete color="secondary" />
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup
              size="small"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => handleCheck(todo._id)}>
                {todo.isCompleted ? (
                  <CheckCircle className={classes.isCompleted} />
                ) : (
                  <CheckCircle color="action" />
                )}
              </Button>
              <Button onClick={handleOnUpdateClick}>
                <Create color="primary" />
              </Button>
              <Button onClick={() => handleDelete(todo._id)}>
                <Delete color="secondary" />
              </Button>
            </ButtonGroup>
          )}

          {/* Update Component */}
          <div>
            <Dialog
              open={open}
              onClose={() => handleClose()}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Update the Todo</DialogTitle>
              <DialogContent>
                <TextField
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                />
                <TextField
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCancel()} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleClose(todo._id)} color="primary">
                  Update Todo
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
