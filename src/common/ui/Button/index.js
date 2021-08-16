import React, { forwardRef } from "react";

import { StyledButton } from "./styles";

const Button = forwardRef(({ icon, children, variant, size, ...rest }, ref) => {
  return (
    <StyledButton variant={variant} size={size} ref={ref} {...rest}>
      {icon}
      {children && <span>{children}</span>}
    </StyledButton>
  );
});

Button.defaultProps = {
  icon: null,
  variant: "contained",
  size: "md",
};

export default Button;
