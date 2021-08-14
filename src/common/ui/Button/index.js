import React, { forwardRef } from "react";

import { StyledButton } from "./styles";

const Button = forwardRef(
  ({ icon, children, variant = "primary", size = "md", ...rest }, ref) => {
    return (
      <StyledButton variant={variant} size={size} ref={ref} {...rest}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    );
  }
);

export default Button;
