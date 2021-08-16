import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "common/ui";
import { StyledSlider } from "./styles";
import { StyledButton, FilterMenuContainer } from "../../styles";

import { ReactComponent as IconFilter } from "common/icons/filter.svg";

const FilterTooltipContent = ({
  minValue,
  maxValue,
  currentMinValue,
  currentMaxValue,
  renderMinValue,
  renderMaxValue,
  step,
  saveFilter,
  resetFilter,
  handleTooltip,
}) => {
  const [localMin, setLocalMin] = useState(currentMinValue || 0);
  const [localMax, setLocalMax] = useState(currentMaxValue || 0);

  useEffect(() => {
    setLocalMax(currentMaxValue);
    setLocalMin(currentMinValue);
  }, [currentMaxValue, currentMinValue]);

  const handleChange = (value) => {
    const [min, max] = value;
    setLocalMin(min);
    setLocalMax(max);
  };
  const handleApply = () => {
    saveFilter(localMin, localMax);
    handleTooltip();
  };
  const handleReset = () => {
    resetFilter();
    setLocalMin(currentMinValue);
    setLocalMax(currentMaxValue);
    handleTooltip();
  };
  return (
    <FilterMenuContainer onClick={(e) => e.stopPropagation()}>
      <StyledSlider
        min={minValue}
        max={maxValue}
        value={[localMin, localMax]}
        onChange={handleChange}
        thumbSize={12}
        trackSize={2}
        step={step}
      />
      <div className="slider-info">
        <p>{renderMinValue != null ? renderMinValue(localMin) : localMin}</p>
        <p>{renderMaxValue != null ? renderMaxValue(localMax) : localMax}</p>
      </div>
      <div className="footer">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" size="sm" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </FilterMenuContainer>
  );
};

const FilterTooltip = ({
  minValue,
  maxValue,
  currentMinValue,
  currentMaxValue,
  step,
  saveFilter,
  resetFilter,
  renderMinValue,
  renderMaxValue,
}) => {
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltip = (e) => {
    e?.stopPropagation?.();
    setTooltipOpen(!isTooltipOpen);
  };

  return (
    <Tooltip
      content={
        <FilterTooltipContent
          minValue={minValue}
          maxValue={maxValue}
          currentMinValue={currentMinValue}
          currentMaxValue={currentMaxValue}
          renderMinValue={renderMinValue}
          renderMaxValue={renderMaxValue}
          step={step}
          saveFilter={saveFilter}
          resetFilter={resetFilter}
          handleTooltip={handleTooltip}
        />
      }
      /**
       * Hacky solution to mount tippy as soon as it's created,
       * otherwise the StyledSlider inside FilterTooltipContent misbehaves.
       */
      onCreate={(inst) => {
        inst.show();
      }}
      visible={isTooltipOpen}
      onClickOutside={handleTooltip}
      placement="bottom-start"
      interactive={true}
      maxWidth="500px"
    >
      <StyledButton variant="ghost" icon={<IconFilter />} onClick={handleTooltip} />
    </Tooltip>
  );
};

export default FilterTooltip;
