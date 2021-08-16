import styled from "@emotion/styled";
import Tippy from "@tippyjs/react";

import "tippy.js/dist/tippy.css";

const StyledTooltip = styled(Tippy)`
  background-color: transparent;
  .tippy-content {
    background-color: #ffffff;
    border-radius: 2px;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.grey["300"]};
  }

  .tippy-arrow {
    color: transparent;
  }
`;

export { StyledTooltip };
