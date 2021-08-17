import styled from "@emotion/styled";

const StyledEmptyCard = styled.div`
  padding: 64px 24px;
  background-color: ${({ theme }) => theme.palette.grey["100"]};
  display: flex;
  align-items: center;
  justify-content: center;

  .banner {
    width: 150px;
    height: auto;
  }

  .content {
    margin-left: 24px;
    .heading {
      color: ${({ theme }) => theme.palette.black["200"]};
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
      margin: 0;
      margin-bottom: 16px;
    }

    .description {
      color: ${({ theme }) => theme.palette.grey["400"]};
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;

    .content {
      margin-left: 0;
      margin-top: 24px;
    }
  }
`;

export { StyledEmptyCard };
