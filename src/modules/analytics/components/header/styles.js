import styled from "@emotion/styled";

import { Button } from "common/ui";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;

    button ~ button {
      margin-top: 8px;
    }
  }
`;

const StyledButton = styled(Button)`
  span {
    color: ${({ theme }) => theme.palette.black["100"]};
    font-weight: 700;
  }
`;

export { ButtonContainer, StyledButton };
