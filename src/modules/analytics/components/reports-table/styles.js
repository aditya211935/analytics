import styled from "@emotion/styled";
import { Button } from "common/ui";

const TableContainer = styled.div`
  overflow-x: auto;
  min-height: 450px;
`;

const HeaderContainer = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.grey["500"]};
    margin: 0;
    margin-bottom: 8px;
  }

  h1 {
    font-size: 24px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.black["100"]};
    margin: 0;
  }
`;

const FilterMenuContainer = styled.div`
  width: 300px;
  .heading {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.black["200"]};
    margin: 0;
    margin-bottom: 8px;
  }

  .slider-info {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 12px;
      font-weight: 400;
      color: ${({ theme }) => theme.palette.black["100"]};
      margin: 0;
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
  }
`;

const StyledButton = styled(Button)`
  svg {
    height: 24px;
    width: 24px;
    margin: 0;
    fill: ${({ theme }) => theme.palette.grey["500"]};
  }

  &:hover svg {
    fill: ${({ theme }) => theme.palette.primary};
  }
`;

export { HeaderContainer, FilterMenuContainer, StyledButton, TableContainer };
