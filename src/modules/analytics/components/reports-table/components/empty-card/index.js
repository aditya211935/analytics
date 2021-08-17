import React from "react";

import { ReactComponent as EmptyBanner } from "common/icons/empty-banner.svg";
import { StyledEmptyCard } from "./styles";

const EmptyCard = (props) => {
  return (
    <StyledEmptyCard>
      <EmptyBanner className="banner" />
      <div className="content">
        <h1 className="heading">
          Hey! Something’s off! <br /> We couldn’t display the given data.
        </h1>
        <p className="description">Try changing your your filters or selecting a different date.</p>
      </div>
    </StyledEmptyCard>
  );
};

export default EmptyCard;
