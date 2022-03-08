import { useState, useCallback, useEffect, useRef } from "react";
import { Card, Task } from "./Task";
import update from "immutability-helper";
import NewTaskForm from "./NewTaskForm";
import { afs } from "../utils/afs";
import Title from "./Title";
import { rootDivStyle } from "../styles/styles";
import Statistic from "./Statistic";
import TaskContainer from "./TaskContainer";
const initialState = [
  {
    id: "1",
    title: "서비스  내용 정리",
    done: true,
  },
  {
    id: "4",
    title: "서비스 개발팀  정리",
    done: true,
  },
  { id: "5", title: "개발팀 회의 내용 정리", done: true },
  { id: "6", title: "서비스 개발팀 회의", done: true },
  { id: "2", title: "PR  만들기", done: false },
  { id: "3", title: "React UI 라이브러리 ", done: false },
  { id: "7", title: "라이브러리 검토", done: false },
  { id: "8", title: "React UI", done: false },
  { id: "9", title: "React 검토", done: false },
];
export const Tasks = () => {
  const [tasks, setTasks] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);
  const [error, setError] = useState({ value: false, message: "" });
  const [rootWidth, setRootWidth] = useState(null);
  const [ifMouseUp, setIfMouseUp] = useState(null);
  const [check, setCheck] = useState({
    ifDone: null,
    hovering: [],
  });
  const updateDimensions = () => {
    console.log(rootRef.current.clientWidth);
    if (rootRef.current) setRootWidth(rootRef.current.clientWidth);
  };

  const handleDelete = useCallback(
    (value) => {
      setTasks(
        tasks.filter((task) => {
          return task !== value;
        })
      );
    },
    [tasks]
  );
  const handleToggle = useCallback(
    (id) => {
      setLoading(true);
      afs(1111);
      setTasks(
        tasks.map((task, index) => {
          return task.id === id ? { ...task, done: !task.done } : task;
        })
      );
    },
    [tasks]
  );

  useEffect(() => {}, [tasks]);
  const taskCreate = useCallback((title) => {
    setTasks((prev) => [
      ...prev,
      { id: (prev.length + 1).toString(), title, done: false, check: false },
    ]);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    setRootWidth(rootRef.current.clientWidth);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const statisticProps = { tasks, rootWidth, error };
  const newTaskFormProps = { setTasks, rootWidth, setError, error, taskCreate };
  const taskContainerProps = {
    tasks,
    rootWidth,
    setTasks,
    handleDelete,
    handleToggle,
    ifMouseUp,
    setIfMouseUp,
    check,
    setCheck,
    loading,
    setLoading,
  };
  return (
    <div ref={rootRef} style={rootDivStyle(rootWidth)}>
      <Title rootWidth={rootWidth} />
      <NewTaskForm {...newTaskFormProps} />
      <Statistic {...statisticProps} />
      <TaskContainer {...taskContainerProps} />
    </div>
  );
};
