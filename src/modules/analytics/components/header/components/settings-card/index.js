import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import { Card, ColumnTagsContainer } from "./styles";

import { Button } from "common/ui";

import ColumnTag from "./components/column-tag";

import { TABLE_KEYS, TABLE_KEY_TO_LABEL } from "modules/analytics/constants";
import { setTablePositionProps } from "modules/analytics/actions";

const SettingsCard = ({ handleClose }) => {
  const dispatch = useDispatch();
  const initialTablePositionProps = useSelector((state) => state.analytics.tablePositionProps);
  const [localTablePositionProps, setLocalTablePositionProps] = useState(initialTablePositionProps);

  // Unnecessary for now because SettingsCard is the
  // only component that can change dateRange
  useEffect(() => {
    setLocalTablePositionProps(initialTablePositionProps);
  }, [initialTablePositionProps]);

  const moveColumn = useCallback((dragIndex, hoverIndex) => {
    setLocalTablePositionProps((prevLocalTablePositionProps) => {
      var newLocalTablePositionProps = [...prevLocalTablePositionProps];
      const [itemToMove] = newLocalTablePositionProps.splice(dragIndex, 1);
      newLocalTablePositionProps.splice(hoverIndex, 0, itemToMove);
      return newLocalTablePositionProps;
    });
  }, []);

  const toggleColumnVisibility = useCallback((key) => {
    if ([TABLE_KEYS.DATE, TABLE_KEYS.APP_ID].includes(key)) return;
    setLocalTablePositionProps((prevLocalTablePositionProps) =>
      prevLocalTablePositionProps.map((item) => {
        if (item.key === key) return { ...item, visible: !item.visible };
        else return item;
      })
    );
  }, []);

  const handleApply = () => {
    dispatch(setTablePositionProps(localTablePositionProps));
    handleClose();
  };

  return (
    <Card>
      <p className="heading">Dimensions and Metrics</p>
      <DndProvider options={HTML5toTouch}>
        <ColumnTagsContainer>
          {localTablePositionProps.map((column, index) => (
            <ColumnTag
              key={column.key}
              index={index}
              id={column.key}
              moveColumn={moveColumn}
              onClick={() => toggleColumnVisibility(column.key)}
              isSelected={column.visible}
            >
              {TABLE_KEY_TO_LABEL[column.key]}
            </ColumnTag>
          ))}
        </ColumnTagsContainer>
      </DndProvider>
      <div className="footer">
        <Button variant="outline" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleApply}>Apply Changes</Button>
      </div>
    </Card>
  );
};

export default SettingsCard;
