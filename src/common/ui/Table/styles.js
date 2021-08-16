import styled from "@emotion/styled";

import { ReactComponent as IconCaretUp } from "common/icons/caret-up.svg";
import { ReactComponent as IconCaretDown } from "common/icons/caret-down.svg";

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border-spacing: 0;
  font-size: 14px;

  .table-row {
    &:hover {
      background: ${({ theme }) => theme.palette.grey["200"]};
      transition-duration: 0.3s;
    }
  }

  .table-header-cell,
  .table-cell {
    min-width: 100px;
    position: relative;
    padding: 16px;
    overflow-wrap: break-word;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => `${theme.palette.grey["500"]}26`};
    color: ${({ theme }) => theme.palette.black["200"]};
  }

  .table-header-cell.sort {
    padding-right: 32px;
    cursor: pointer;
  }

  .sort-icon-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(50% - 12px);
    right: 16px;
  }
`;

const StyledIconCaretUp = styled(IconCaretUp)`
  height: 12px;
  width: 12px;
  fill: ${({ theme, isActive, isHidden }) =>
    isHidden ? "transparent" : isActive ? theme.palette.primary : theme.palette.grey["400"]};
`;

const StyledIconCaretDown = styled(IconCaretDown)`
  height: 12px;
  width: 12px;
  fill: ${({ theme, isActive }) => (isActive ? theme.palette.primary : theme.palette.grey["400"])};
`;

export { StyledTable, StyledIconCaretDown, StyledIconCaretUp };
