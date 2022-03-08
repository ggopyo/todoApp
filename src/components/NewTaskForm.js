import { Alert, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { afs } from "../utils/afs";
import {
  alertStyle,
  boxStyle,
  buttonStyle,
  inputStyle,
} from "../styles/styles";

const NewTaskForm = ({
  setTasks,
  rootWidth,
  setError,
  error,

  taskCreate,
}) => {
  const [title, setTitle] = useState("");
  const handleChange = (event) => {
    if (title.length > 30) {
      setError({
        value: true,
        message: `30자 이상 입력할 수 없습니다. 다시 작성해 주세요`,
      });
      // setTitle("");
      setTitle(title.substring(title, 20));
    } else {
      setError({ value: false, message: "" });
      setTitle(event.target.value);
    }
  };
  const handleSubmit = () => {
    if (
      (title.match(/ /g) || []).length !== title.length &&
      title.length <= 40
    ) {
      taskCreate(title);
      setTitle("");
    } else {
      setError({
        value: true,
        message: "공백은 입력할 수 없습니다. 공백을 제거해 주세요.",
      });
      setTitle("");
    }
  };

  const handlePressEnter = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      if ((title.match(/ /g) || []).length !== title.length) {
        setTasks((prev) => [
          ...prev,
          {
            id: (prev.length + 1).toString(),
            title,
            done: false,
            check: false,
          },
        ]);
        setTitle("");
      } else {
        setError({
          value: true,
          message: "공백은 입력할 수 없습니다. 공백을 제거해 주세요.",
        });
        setTitle("");
      }
    }
  };
  return (
    <>
      <Box sx={boxStyle(rootWidth)}>
        <TextField
          sx={inputStyle(rootWidth)}
          placeholder="새로울 할 일을 입력하세요."
          autoFocus
          variant="outlined"
          value={title}
          onKeyDown={handlePressEnter}
          onChange={handleChange}
          inputRef={(input) => input && input.focus()}
        ></TextField>

        <Button onClick={handleSubmit} sx={buttonStyle(rootWidth)}>
          등록하기
        </Button>
      </Box>{" "}
      <Alert sx={alertStyle(error, rootWidth)}>{error.message}</Alert>
    </>
  );
};

export default NewTaskForm;
