import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Tabs, Tab, AppBar } from "@material-ui/core";

import Completed from "../components/Completed";
import TodoList from "../components/TodoList";
import TodoHistory from "./TodoHistory";
import { getTodos } from "../services/services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomePage() {
  const history = useHistory();
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
    console.log(todos);
  // eslint-disable-next-line
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    history.push("/signin");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ascentic : ToDo
          </Typography>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Home" />
            <Tab label="Completed" />
            <Tab label="History" />
          </Tabs>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {selectedTab === 0 && <TodoList todos={todos} setTodos={setTodos} />}
      {selectedTab === 1 && <Completed todos={todos} setTodos={setTodos} />}
      {selectedTab === 2 && <TodoHistory todos={todos} />}
    </div>
  );
}
