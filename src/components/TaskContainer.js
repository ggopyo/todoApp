import React, { useCallback, useEffect, useState } from "react";
import { Task } from "./Task";
import CustomDivider from "./CustomDivider";
import update from "immutability-helper";
import { Divider, Typography } from "@mui/material";
import { afs } from "../utils/afs";
import { taskContainerStyle } from "../styles/styles";
import { SpinnerCircular } from "spinners-react";
const TaskContainer = (props) => {
  const {
    tasks,
    rootWidth,
    setTasks,
    handleToggle,
    handleDelete,
    ifMouseUp,
    check,
    setCheck,
    setIfMouseUp,
    loading,
    setLoading,
  } = props;
  const [doneTasks, setDoneTasks] = useState([]);
  const [boundary, setBoundary] = useState({
    doneBottom: null,
    unDoneTop: null,
  });
  const [hover, setHover] = useState(null);
  const [tempDonePos, setTempDonePos] = useState(null);
  const [tempUnDonePos, setTempUnDonePos] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [undoneTasks, setUnDoneTasks] = useState([]);
  const [doneTasksPredicate, setDoneTasksPredicate] = useState([]);
  const [undoneTasksPredicate, setUnDoneTasksPredicate] = useState([]);

  Array.prototype.containsAll = function () {
    return Array.from(arguments).every((i) => this.includes(i));
  };
  const nanExistenceChecker = () => {
    for (var i = 0; i < check.hovering.length; i++) {
      if (isNaN(check.hovering[i])) {
        return true;
      }
    }
    return false;
  };
  const taskProps = (task, index, ifDone, realIndex) => {
    return {
      index,
      id: task.id,
      task,
      tasks,
      length: doneTasks.length,
      title: task.title,
      done: task.done,
      check,
      tempDonePos,
      setTempDonePos,
      tempUnDonePos,
      setPosition,
      position,
      setTempUnDonePos,
      moveCard,
      boundary,
      setBoundary,
      rootWidth,
      setTasks,
      handleDelete,
      handleToggle,
      realIndex,
      ifDone,
      setCheck,
      loading,
      setLoading,
      hover,
    };
  };

  const moveCard = (dragIndex, hoverIndex, hoverTop, hoverBottom) => {
    // console.log(dragIndex, hoverIndex);
    // afs(position.y < boundary.doneBottom);
    // afs(position.y);
    // afs(boundary.doneBottom);

    setHover(hoverIndex);
    console.log(doneTasksPredicate);
    if (doneTasksPredicate.includes(dragIndex)) {
      console.log(boundary);
      if (
        hoverIndex < doneTasksPredicate.length
      ) {
        setLoading(true);
        setTasks((prevCards) => {
          return update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          });
        });
      }
      setCheck({
        ifDone: "up",
        hovering: isNaN(check.hovering)
          ? [...check.hovering]
          : [...check.hovering, hoverIndex],
      });
    } else if (undoneTasksPredicate.includes(dragIndex)) {
      if (
        hoverIndex >= doneTasksPredicate.length &&
        position.y > boundary.unDoneTop &&
        boundary.unDoneTop < hoverBottom
      ) {
        setLoading(true);
        setTasks((prevCards) => {
          return update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          });
        });
      }
      setCheck({
        ifDone: "down",
        hovering: isNaN(check.hovering)
          ? [...check.hovering]
          : [...check.hovering, hoverIndex],
      });
    } else {
    }

    const ifNanExist = nanExistenceChecker();
    console.log(
      check.ifDone,
      doneTasksPredicate,
      doneTasks,
      check.hovering,
      doneTasksPredicate.containsAll(...check.hovering),
      !ifNanExist,
      hoverIndex < doneTasksPredicate.length
    );

    if (
      check.ifDone === "up" &&
      doneTasksPredicate.containsAll(...check.hovering) &&
      !ifNanExist &&
      hoverIndex < doneTasksPredicate.length &&
      position.y < boundary.doneBottom &&
      boundary.doneBottom > hoverTop
    ) {
      setLoading(true);
      setTasks((prevCards) => {
        return update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        });
      });
    } else if (
      check.ifDone === "down" &&
      undoneTasksPredicate.containsAll(...check.hovering) &&
      !ifNanExist &&
      hoverIndex >= doneTasksPredicate.length &&
      position.y > boundary.unDoneTop &&
      boundary.unDoneTop < hoverBottom
    ) {
      setLoading(true);
      setTasks((prevCards) => {
        return update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        });
      });
    } else {
      afs("none exist 에 들어옴");
    }
  };

  const renderCard = (task, index, ifDone, realIndex = index) => {
    return <Task key={index} {...taskProps(task, index, ifDone, realIndex)} />;
  };

  useEffect(() => {
    setDoneTasks(tasks.filter((item) => item.done));
    setUnDoneTasks(tasks.filter((item) => !item.done));
    setDoneTasksPredicate(
      tasks
        .map((item, index) => item.done && index)
        .filter((item) => typeof item === "number")
    );
    setUnDoneTasksPredicate(
      tasks
        .map((item, index) => !item.done && index)
        .filter((item) => typeof item === "number")
    );
  }, [tasks]);

  useEffect(() => {
    window.addEventListener("mouseup", () => {
      setIfMouseUp(true);
      setCheck({ ifDone: null, hovering: [] });
    });

    return () => {
      window.removeEventListener("mouseup", () => setIfMouseUp(null));
    };
  }, []);
  return (
    <div style={taskContainerStyle(rootWidth)}>
      <CustomDivider
        rootWidth={rootWidth}
        text="완&nbsp;&nbsp;&nbsp;&nbsp;료"
      />
      {doneTasks.map((task, index) => {
        return renderCard(task, index, true);
      })}
      <CustomDivider rootWidth={rootWidth} text="미완료" />
      {undoneTasks.map((task, index) => {
        return renderCard(task, index, false, doneTasks.length + index);
      })}
    </div>
  );
};

export default TaskContainer;
