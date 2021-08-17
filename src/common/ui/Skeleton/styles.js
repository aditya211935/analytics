import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const slide = keyframes`
   0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonContainer = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  animation: ${slide} 0.8s ease-in-out infinite;

  background: ${({ theme }) => theme.palette.grey["100"]};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.palette.grey["100"]},
    ${({ theme }) => theme.palette.grey["200"]},
    ${({ theme }) => theme.palette.grey["100"]}
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;

  cursor: progress;
  border-radius: 4px;
`;

export { SkeletonContainer };
