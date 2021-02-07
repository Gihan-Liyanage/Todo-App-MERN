import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import StatisticCard from "../components/StatisticCard";
import TodoTable from "../components/TodoTable";

export default function TodoHistory({ todos }) {
  const [completedNo, setCompletedNo] = useState(0);
  const [activeNo, setActiveNo] = useState(0);

  useEffect(() => {
    setCompletedNo(todos.filter((todo) => todo.isCompleted === true).length);
    setActiveNo(todos.filter((todo) => todo.isCompleted === false).length);
  }, []);

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <StatisticCard title="Active Todos:" value={activeNo} />
        </Grid>
        <Grid item xs={6}>
          <StatisticCard title="Completed Todos:" value={completedNo} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TodoTable todos={todos} />
        </Grid>
      </Grid>
    </div>
  );
}
