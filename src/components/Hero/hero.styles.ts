import styled from "styled-components";
import { HeroHeight, sizeUnits } from "../../theme/sizes";
import { bigRadius } from "../../theme/border";
import { H1, H3 } from "../../theme/typography";
import { Breakpoint, media } from "../../theme/media";

export const Container = styled.div`
  width: 100%;
  height: ${HeroHeight};
  background-color: rgba(214, 239, 255, 1);
  background-image: linear-gradient(
    162deg,
    rgba(214, 239, 255, 1) 52%,
    rgba(120, 199, 202, 1) 100%
  );
  display: flex;
  flex-direction: column;
  border-radius: ${bigRadius};
  padding: 0;
  ${media(Breakpoint.TABLET)`
    padding-left: ${sizeUnits(8)};

`}
`;

export const HeadingWrapper = styled.div`
  padding: ${sizeUnits(2)};
  ${media(Breakpoint.TABLET)`
    padding-top: ${sizeUnits(4)};
    padding-bottom: ${sizeUnits(4)};
`}
`;
export const Heading = styled(H1)`
  font-weight: 1000;
`;

export const SubHeading = styled(H3)``;
export const SubHeadingWrapper = styled.div`
  padding: 20px;
`;
