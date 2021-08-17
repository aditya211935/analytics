import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ButtonContainer, StyledButton } from "./styles";

import { Tooltip } from "common/ui";
import { ReactComponent as IconCalender } from "common/icons/calendar.svg";
import { ReactComponent as IconSettings } from "common/icons/settings.svg";
import { formatDate } from "common/utils/helpers";

import DateMenu from "./components/date-menu";
import SettingsCard from "./components/settings-card";

const Header = (props) => {
  const [isDateTooltipOpen, setDateTooltip] = useState(false);
  const [isSettingsCardOpen, setSettingsCard] = useState(false);
  const { fromDate, toDate } = useSelector((state) => ({
    fromDate: state.analytics.dateRange.fromDate,
    toDate: state.analytics.dateRange.toDate,
  }));

  const handleDateTooltip = () => setDateTooltip(!isDateTooltipOpen);
  const handleSettingsCard = () => setSettingsCard(!isSettingsCardOpen);
  return (
    <div>
      <ButtonContainer>
        <Tooltip
          content={<DateMenu handleClose={handleDateTooltip} />}
          visible={isDateTooltipOpen}
          placement="bottom-start"
          interactive={true}
          onClickOutside={handleDateTooltip}
        >
          <StyledButton variant="outline" icon={<IconCalender />} onClick={handleDateTooltip}>
            {formatDate(fromDate, true)} - {formatDate(toDate, true)}
          </StyledButton>
        </Tooltip>
        <StyledButton variant="outline" icon={<IconSettings />} onClick={handleSettingsCard}>
          Settings
        </StyledButton>
      </ButtonContainer>
      {isSettingsCardOpen && <SettingsCard handleClose={handleSettingsCard} />}
    </div>
  );
};

export default Header;
