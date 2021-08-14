import React, { forwardRef } from "react";

import { StyledButton } from "./styles";

const Button = forwardRef(
  ({ icon, children, variant = "primary", size = "md", ...rest }, ref) => {
    return (
      <StyledButton variant={variant} size={size} ref={ref} {...rest}>
        {icon}
        {typeof children === "string" ? <span>{children}</span> : children}
      </StyledButton>
    );
  }
);

export default Button;
