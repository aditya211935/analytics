import styled from "@emotion/styled";

const determineBg = ({ theme, variant }) => {
  if (variant === "outline") {
    return `
      background-color: #FFFFFF;
      color: ${theme.palette.primary};
      border-color: ${theme.palette.grey["300"]};

      &:active, &:hover {
        border-color: ${theme.palette.primary};
      }
    `;
  } else {
    return `
      background-color: ${theme.palette.primary};
      color: #FFFFFF;
      border-color: ${theme.palette.primary};
    `;
  }
};

const StyledButton = styled.button`
  ${determineBg}
  display: flex;
  align-items: center;
  text-align: center;

  // dimensions
  height: 42px;
  font-size: 18px;
  line-height: 22px;
  padding: 4px 8px;

  // border
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;

  // misc
  cursor: pointer;

  span {
    width: 100%;
  }

  svg {
    margin-right: 6px;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.grey["200"]};
    cursor: not-allowed;
    pointer-events: none;
    border-color: ${({ theme }) => theme.palette.grey["300"]};
    color: ${({ theme }) => theme.palette.black["200"]};
  }
`;

export { StyledButton };
