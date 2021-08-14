import React from "react";

import { Container, SidebarContainer, Body } from "./styles";

const Layout = ({ children }) => {
  return (
    <Container>
      <SidebarContainer />
      <Body>{children}</Body>
    </Container>
  );
};

export default Layout;
