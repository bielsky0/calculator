import styled from "styled-components";
import { sizeUnits } from "../../theme/sizes";
import { H2, H4, Label } from "../../theme/typography";
import { color } from "../../theme";
import { Breakpoint, media } from "../../theme/media";

export const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${media(Breakpoint.TABLET)`
  justify-content: space-between;

  `}
  padding-top: ${sizeUnits(4)};
  padding-bottom: ${sizeUnits(2)};
`;
export const Heading = styled(H4)`
  font-weight: bold;
  font-size: ${sizeUnits(3)};
`;

export const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${sizeUnits(3)};

  align-items: center;

  ${media(Breakpoint.TABLET)`
align-items: normal;

`}
`;

export const Price = styled(H2)``;

export const PriceTitle = styled(Label)`
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${color.text};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled(Label)``;
