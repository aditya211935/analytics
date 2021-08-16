import styled from "@emotion/styled";

const determineBg = ({ theme, variant }) => {
  if (variant === "ghost") {
    return `
      background-color: #FFFFFF;
      color: ${theme.palette.black["200"]};
      border-color: transparent;
    `;
  } else if (variant === "outline") {
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

const determineDimensions = ({ size = "md" }) => {
  switch (size) {
    case "sm":
      return `
			height: 32px;
			font-size: 12px;
      padding: 4px 8px;
		`;
    default:
      return `
			height: 42px;
      padding: 4px 8px;
			font-size: 14px;
		`;
  }
};

const StyledButton = styled.button`
  ${determineBg}
  ${determineDimensions}
  display: flex;
  align-items: center;
  text-align: center;

  // border
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;

  // misc
  cursor: pointer;
  letter-spacing: 0.27px;

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

  ${({ variant }) => (variant === "ghost" ? `font-weight: 700;` : "")}
`;

export { StyledButton };
