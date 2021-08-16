import styled from "@emotion/styled";

const CheckboxContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 16px;
`;

const StyledLabel = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.black["200"]};
  .app-name {
    font-size: 14px;
    margin: 0;
    margin-bottom: 4px;
  }
  .app-id {
    font-size: 12px;
    margin: 0;
  }
`;

export { StyledLabel, CheckboxContainer };
