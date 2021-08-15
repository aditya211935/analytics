import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { StyledColumnTag } from "./styles";

const ColumnTag = ({ id, index, moveColumn, children, ...props }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "columnTag",
    collect: monitor => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
    
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      if (
        Math.abs(monitor.getClientOffset().x - hoverBoundingRect.left) >
        hoverBoundingRect.width / 1.8
      )
        return;

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "columnTag",
    item: () => {
      return { index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <StyledColumnTag
      ref={ref}
      isDragging={isDragging}
      data-handler-id={handlerId}
      {...props}
    >
      {children}
    </StyledColumnTag>
  );
};

export default ColumnTag;
