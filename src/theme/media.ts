import { complement, isNil, reverse } from "ramda";
import {
  BaseThemedCssFunction,
  DefaultTheme,
  SimpleInterpolation,
  css,
} from "styled-components";

export enum Breakpoint {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
  DESKTOP_WIDE = "DESKTOP_WIDE",
  DESKTOP_FULL = "DESKTOP_FULL",
}

export const sizes: Record<Breakpoint, number> = {
  [Breakpoint.DESKTOP_FULL]: 1920,
  [Breakpoint.DESKTOP_WIDE]: 1440,
  [Breakpoint.DESKTOP]: 1280,
  [Breakpoint.TABLET]: 768,
  [Breakpoint.MOBILE]: 360,
};

export const sizesOrdered = [
  Breakpoint.MOBILE,
  Breakpoint.TABLET,
  Breakpoint.DESKTOP,
  Breakpoint.DESKTOP_WIDE,
  Breakpoint.DESKTOP_FULL,
] as const;

export const getBreakpointMediaQuery = (breakpoint: Breakpoint) =>
  `(min-width: ${sizes[breakpoint]}px)`;

export const media = (
  breakpoint: Breakpoint,
  opts: { landscape?: boolean; retina?: boolean } = {}
) => {
  return ((
    styleTemplate: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => {
    const joinQuery = (...queries: (string | null)[]) =>
      queries.filter(complement(isNil)).join(" and ");

    const sizeQuery = `(min-width: ${sizes[breakpoint]}px)`;
    const landscapeQuery = opts.landscape ? "(orientation: landscape)" : null;
    const retinaQueries = opts.retina
      ? ["(-webkit-min-device-pixel-ratio: 2)", "(min-resolution: 192dpi)"]
      : null;

    let query;
    if (retinaQueries) {
      query = retinaQueries
        .map((retinaQuery) => joinQuery(sizeQuery, landscapeQuery, retinaQuery))
        .join(", ");
    } else {
      query = joinQuery(sizeQuery, landscapeQuery);
    }

    return css`
      @media ${query} {
        ${css(styleTemplate, ...interpolations)}
      }
    `;
  }) as BaseThemedCssFunction<DefaultTheme>;
};

export const responsiveValue =
  <Value>(
    defaultValue: Value,
    config: Partial<Record<Breakpoint, Value>> = {}
  ) =>
  ({ theme }: { theme: DefaultTheme }) => {
    const matchesCurrentBreakpoint = (breakpoint: Breakpoint) =>
      sizesOrdered.indexOf(breakpoint) <=
      sizesOrdered.indexOf(theme.activeBreakpoint ?? Breakpoint.MOBILE);
    const matchingBreakpoint = reverse(sizesOrdered).find(
      (size) => config[size] && matchesCurrentBreakpoint(size)
    );
    return matchingBreakpoint ? config[matchingBreakpoint] : defaultValue;
  };
