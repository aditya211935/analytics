import styled from "@emotion/styled";

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
    top: 50%;
    transform: translateY(-50%);
    right: 16px;

    svg {
      height: 12px;
      width: 12px;
      fill: ${({ theme }) => theme.palette.grey["400"]};

      &.active {
        fill: ${({ theme }) => theme.palette.primary};
      }
    }

    svg ~ svg {
      margin-top: -2px;
    }
  }
`;

export { StyledTable };
