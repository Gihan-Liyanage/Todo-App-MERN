import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, ButtonGroup, Button } from '@material-ui/core';
import { Create, Delete, CheckCircle } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteTodo } from '../services/services';

import UpdateWindow from './UpdateWindow';

// import moment from "moment";

const useStyles = makeStyles({
  todoStyle: {
    margin: '20px auto',
    padding: '20px',
    border: '2px solid #bdbdbd',
    borderRadius: '9px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  moreStyle: {
    color: '#8f8f8f',
  },
  isComplete: {
    color: 'green',
  },
  checked: {
    textDecoration: 'line-through',
  },
});

const Todo = ({ todo, setTodos, todos }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOnUpdateClick = (id) => {
    setOpen(true);
    console.log(id);
  };

  const handleClose = (id) => {
    // try {
    //   const url = "http://localhost:5000/api/todos/" + id;
    //   const response = await axios.put(url, ).data;
    //   console.log(response);
    //   const selectedTodos = todos.filter((todo) => todo._id !== id);
    //   setTodos(selectedTodos);
    // } catch (error) {
    //   console.log(error);
    // }
    // setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const url = 'http://localhost:5000/api/todos/' + id;
      const response = await axios.delete(url, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });

      console.log(response);
      const selectedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(selectedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (id) => {
    try {
      console.log(id);
      const url = 'http://localhost:5000/api/todos/' + id;
      const response = await axios.patch(url);
      console.log(response.data);
      const selectedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(selectedTodos, response.data);
    } catch (error) {}
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
            <ButtonGroup size="small" aria-label="outlined primary button group">
              <Button onClick={() => handleDelete(todo._id)}>
                <Delete color="secondary" />
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup size="small" aria-label="outlined primary button group">
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
              {/* <UpdateWindow isOpen={isOpen}/> */}
              <Button onClick={() => handleDelete(todo._id)}>
                <Delete color="secondary" />
              </Button>
            </ButtonGroup>
          )}
          <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update the Todo</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose(todo._id)} color="primary">
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
