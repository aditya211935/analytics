import React from "react";

import { Container } from "./styles";

const Checkbox = ({ label, checked, className, ...props }) => {
  return (
    <Container checked={checked} className={className}>
      <label>
        <input type="checkbox" checked={checked} {...props} />
        {label}
      </label>
    </Container>
  );
};

export default Checkbox;
