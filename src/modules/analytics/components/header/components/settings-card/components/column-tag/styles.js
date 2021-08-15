import styled from "@emotion/styled";

const StyledColumnTag = styled.div`
  grid-column: span 2;
  padding: 8px 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black["200"]};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.grey["300"]};
  border-radius: 4px;

  cursor: pointer;

  ${({ isDragging }) => (isDragging ? `opacity: 0.2;` : ``)}
  ${({ theme, isSelected }) => isSelected ? `
    border-left-color: ${theme.palette.primary};
    border-left-width: 4px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  ` : ""}

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 4;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 8;
  }
`;

export { StyledColumnTag };
