import { css } from "styled-components";
import { Breakpoint, responsiveValue } from "./media";

export const sizeUnitBase = 8;
export const sizeUnits = (size = 1) => size * sizeUnitBase + "px";

export const navHeight = responsiveValue(sizeUnits(8), {
  [Breakpoint.TABLET]: sizeUnits(8),
});

export const containerWidth = responsiveValue(sizeUnits(1000 / 8), {
  [Breakpoint.TABLET]: sizeUnits(2),
});

export const fullContentHeight = css`
  min-height: calc(100vh - ${navHeight});
`;

export const HeroHeight = responsiveValue(sizeUnits(25), {
  [Breakpoint.MOBILE]: sizeUnits(30),
});

export const serviceHeight = responsiveValue(sizeUnits(140 / 8));

export const serviceWidth = responsiveValue(sizeUnits(226 / 8));

export const comboHeight = responsiveValue(sizeUnits(160 / 8));

export const comboWidth = responsiveValue(sizeUnits(300 / 8), {
  [Breakpoint.MOBILE]: sizeUnits(290 / 8),
});
