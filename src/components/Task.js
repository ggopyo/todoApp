import { ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ActionButtons from "./ActionButtons";
import { afs } from "../utils/afs";
import CustomDivider from "./CustomDivider";
import { ItemTypes } from "./ItemTypes";
import { numberingStyle } from "../styles/styles";
import { SpinnerCircular } from "spinners-react";

export const Task = ({
  index,
  tasks,
  length,
  realIndex,
  id,
  title,
  done,
  moveCard,
  tempDonePos,
  setTempDonePos,
  tempUnDonePos,
  setTempUnDonePos,
  setPosition,
  position,
  rootWidth,
  setBoundary,
  boundary,
  task,
  handleToggle,
  handleDelete,
  ifDone,
  check,
  setCheck,
  loading,
  setLoading,
  hover,
}) => {
  const style = {
    border: "0.1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
    alignItems: rootWidth < 500 ? "flex-start" : null,
    minHeight: rootWidth < 500 ? "50px" : null,
  };
  const noneTextStyle = {
    "& .MuiTypography-root": {
      userSelect: "none",
      width: rootWidth < 500 ? 240 : 330,
    },
    mt: rootWidth < 500 ? 0.4 : 1,
    ml: 1,
  };
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.realIndex;
      const hoverIndex = realIndex;

      // 드래그해서 그자리에 드랍할 경우
      if (dragIndex === hoverIndex) {
        return;
      }
      // 화면의 사각형을 지정한다
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // 수직 축의 중간지점을 얻는다

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // 마우스 좌표를 얻는다
      const clientOffset = monitor.getClientOffset();
      // 화면 상단의 좌표를 얻는다
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // 마우스 좌표가 사각형 아이템의 중간 지점을 넘었을 때만 작동한다
      // 아래쪽으로 드래그할 때는, 오직 마우스 커서가 사각형의 50% 지점 아래에 있을 때만 움직인다
      // 위쪽으로 드래그할 때는, 오직 마우스 커서가 사각형의 50% 지점 위에 있을 때만 움직인다
      // 아래쪽으로 드래그
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // 위쪽으로 드래그
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // 실제로 옮기는 액션을 취하는 곳
      moveCard(
        dragIndex,
        hoverIndex,
        hoverBoundingRect.top,
        hoverBoundingRect.bottom
      );
      item.realIndex = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, realIndex };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  useEffect(() => {
    if (!isDragging) {
      setCheck({ ifDone: null, hovering: [] });
      setLoading(false);
    }
  }, [position]);

  useEffect(() => {
    const setFromEvent = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  useEffect(() => {
    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    if (realIndex === length - 1) {
      setTempDonePos(hoverBoundingRect.bottom);
    }
    if (realIndex === length) {
      setTempUnDonePos(hoverBoundingRect.top);
    }
  }, [tasks]);

  useEffect(() => {
    setBoundary({ doneBottom: tempDonePos, unDoneTop: tempUnDonePos });
  }, [tempDonePos, tempUnDonePos]);

  useEffect(() => {
    // afs(boundary);
  }, [boundary]);
  const backgroundColor = isDragging ? "skyblue" : "white";
  drag(drop(ref));
  const actionButtonProps = {
    handleDelete,
    task,
    id,
    handleToggle,
    done,
    rootWidth,
  };

  return (
    <>
      {/* {hover === realIndex && loading && (
        <div
          style={{
            display: "flex",
            height: "55px",
            justifyContent: "center",
          }}
        >
          <SpinnerCircular />
        </div>
      )} */}
      <ListItem
        ref={ref}
        style={{
          ...style,
          backgroundColor,
          display: hover === realIndex && loading ? "none" : null,
        }}
        data-handler-id={handlerId}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          height: rootWidth < 500 ? 120 : null,
        }}
        secondaryAction={<ActionButtons {...actionButtonProps} />}
        disablePadding
      >
        <Box sx={numberingStyle} variant="rounded">
          {"" + (index + 1)}
        </Box>
        <ListItemText sx={noneTextStyle} primary={title} />
      </ListItem>
    </>
  );
};
