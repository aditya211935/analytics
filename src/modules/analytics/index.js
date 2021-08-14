import React from "react";

import { Button } from "common/ui";
import { ReactComponent as IconCalender } from "common/icons/calendar.svg";

const Analytics = props => {
  return (
    <div>
      <Button variant="outline" icon={<IconCalender />}>Date</Button>
    </div>
  );
};

export default Analytics;
