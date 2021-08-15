import styled from "@emotion/styled";

const Card = styled.div`
  padding: 16px 24px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.grey["300"]};

  .heading {
    font-size: 14px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 8px;
  }

  .footer {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button ~ button {
      margin-left: 8px;
    }
  }
`;

const ColumnTagsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-gap: 12px;
`;

export { Card, ColumnTagsContainer };
