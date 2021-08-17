import React, { useEffect, useMemo, useState } from "react";
import { Button, Tooltip, Checkbox, Input } from "common/ui";
import { CheckboxContainer, StyledLabel } from "./styles";
import { StyledButton, FilterMenuContainer } from "../../styles";

import { ReactComponent as IconFilter } from "common/icons/filter.svg";

const FilterAppTooltipContent = ({
  appsList,
  selectedAppIdsList,
  saveFilter,
  resetFilter,
  handleTooltip,
}) => {
  const [localselectedAppIdsList, setLocalselectedAppIdsList] = useState(selectedAppIdsList || []);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setLocalselectedAppIdsList(selectedAppIdsList || []);
  }, [selectedAppIdsList]);

  const filteredAppsList = useMemo(() => {
    return appsList.filter(
      (item) =>
        Object.values(item).filter((value) =>
          value.toLowerCase().includes(searchValue.toLowerCase())
        ).length > 0
    );
  }, [appsList, searchValue]);

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setLocalselectedAppIdsList((prev) => [event.target.value, ...prev]);
    } else {
      setLocalselectedAppIdsList((prev) => prev.filter((appId) => appId != event.target.value));
    }
  };
  const handleApply = () => {
    saveFilter(localselectedAppIdsList);
    handleTooltip();
  };
  const handleReset = () => {
    resetFilter();
    setLocalselectedAppIdsList(selectedAppIdsList || []);
    handleTooltip();
  };

  return (
    <FilterMenuContainer onClick={(e) => e.stopPropagation()}>
      <p className="heading">Select App</p>
      <Input
        size="sm"
        block
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search app"
      />
      <CheckboxContainer>
        {filteredAppsList.map(({ appName, appId }) => (
          <Checkbox
            key={appId}
            label={
              <StyledLabel>
                <p className="app-name">{appName}</p>
                <p className="app-id">{appId}</p>
              </StyledLabel>
            }
            checked={localselectedAppIdsList.includes(appId)}
            name="selectedAppIds"
            value={appId}
            onChange={handleCheckbox}
          />
        ))}
      </CheckboxContainer>
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

const FilterAppTooltip = ({ appsList, selectedAppIdsList, saveFilter, resetFilter }) => {
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltip = (e) => {
    e?.stopPropagation?.();
    setTooltipOpen(!isTooltipOpen);
  };

  return (
    <Tooltip
      content={
        <FilterAppTooltipContent
          appsList={appsList}
          selectedAppIdsList={selectedAppIdsList}
          saveFilter={saveFilter}
          resetFilter={resetFilter}
          handleTooltip={handleTooltip}
        />
      }
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

export default FilterAppTooltip;
