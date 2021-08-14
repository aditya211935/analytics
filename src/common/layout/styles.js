import styled from "@emotion/styled";

const Container = styled.div``;

const SidebarContainer = styled.div`
  height: 100vh;
  width: 60px;
  transition: 0.5s;

  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.palette.blue["100"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 0;
  }
`;

const Body = styled.div`
  position: relative;
  margin-left: 60px;
  width: 100%;
  padding: 60px 32px 32px 32px;
  min-height: calc(100vh - 60px - 32px);
  max-width: calc(100% - 60px - 64px);
  overflow: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    padding: 32px 16px 16px 16px;
    max-width: calc(100% - 32px);
    min-height: calc(100vh - 32px - 16px);
  }
`;

export { Container, SidebarContainer, Body };
