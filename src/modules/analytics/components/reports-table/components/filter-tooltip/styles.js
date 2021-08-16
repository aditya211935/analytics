import styled from "@emotion/styled";
import ReactSlider from "react-slider";

const StyledSlider = styled(ReactSlider)`
  width: 300px;

  height: ${({ thumbSize }) => `${thumbSize}px`};

  .thumb {
    background-color: ${({ theme }) => theme.palette.primary};
    cursor: pointer;
    height: ${({ thumbSize }) => `${thumbSize}px`};
    width: ${({ thumbSize }) => `${thumbSize}px`};
    border-radius: 50%;
    transition: none;
  }

  .track {
    background-color: ${({ theme }) => theme.palette.primary};
    height: ${({ trackSize }) => `${trackSize}px`};
    top: ${({ trackSize, thumbSize }) => `calc(${thumbSize / 2}px - ${trackSize / 2}px)`};
    transition: none;
  }

  .track-0,
  .track-2 {
    background-color: ${({ theme }) => theme.palette.grey["400"]};
  }
`;

export { StyledSlider };
