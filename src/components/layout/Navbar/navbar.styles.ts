import styled from "styled-components";
import { color } from "../../../theme";
import { containerWidth, navHeight } from "../../../theme/sizes";

import { NavLink } from "react-router-dom";
import { Breakpoint, media } from "../../../theme/media";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  background-color: ${color.navbarColor};

  height: ${navHeight};
  box-shadow: -3px 1px 35px -24px rgba(0, 0, 0, 1);
`;

export const NavigationWrapper = styled.div`
  width: ${containerWidth};
`;

export const Navigation = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  ${media(Breakpoint.TABLET)`
    justify-content: space-between;

  `}
  align-items: center;
`;

export const Link = styled(NavLink)``;
