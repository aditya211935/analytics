import styled from "@emotion/styled";

const determineDimensions = ({ size = "md" }) => {
  switch (size) {
    case "sm":
      return `
			height: 32px;
			font-size: 12px;
      padding: 0 8px;
		`;
    default:
      return `
			height: 42px;
      font-size: 14px;
      padding: 0 8px;
		`;
  }
};

const InputStyled = styled.input`
  outline: none;
  font-family: "Lato", sans-serif;
  box-sizing: border-box;
  ${determineDimensions}
  ${({ block }) => {
    return block ? `width: 100%;` : "";
  }}

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.grey["300"]};
  border-radius: 8px;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.palette.primary};
  }
`;

export { InputStyled };
