import styled from "@emotion/styled";

const Label = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black["200"]};
  margin-bottom: 8px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;

  .separator {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.black["200"]};
    margin: 0px 8px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export { Label, DateContainer, Footer };
