import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Label, DateContainer, Footer } from "./styles";

import { Button, Input } from "common/ui";
import { resetDateRange, setDateRange } from "modules/analytics/actions";

const DateMenu = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { initialFromDate, initialToDate } = useSelector((state) => ({
    initialFromDate: state.analytics.dateRange.fromDate,
    initialToDate: state.analytics.dateRange.toDate,
  }));
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);

  // Unnecessary for now because DateMenu is the
  // only component that can change dateRange
  useEffect(() => {
    if (initialFromDate !== fromDate) setFromDate(initialFromDate);
    if (initialToDate !== toDate) setToDate(initialToDate);
  }, [initialFromDate, initialToDate]);

  const handleApply = () => {
    dispatch(setDateRange({ fromDate, toDate }));
    handleClose();
  };

  const handleReset = () => {
    dispatch(resetDateRange());
    handleClose();
  };

  return (
    <div>
      <Label>Select Range</Label>
      <DateContainer>
        <Input
          size="sm"
          type="date"
          max={toDate}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <p className="separator">to</p>
        <Input
          size="sm"
          type="date"
          min={fromDate}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </DateContainer>
      <Footer>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" size="sm" onClick={handleApply}>
          Apply
        </Button>
      </Footer>
    </div>
  );
};

export default DateMenu;
