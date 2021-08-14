import styled from "@emotion/styled";

import { Button } from "common/ui";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  span {
    color: ${({ theme }) => theme.palette.black["100"]};
    font-weight: 700;
  }
`;

export { ButtonContainer, StyledButton };
