import { css } from "styled-components";

import * as colors from "./color";

export const regular = `1px solid ${colors.border}`;

export const light = `1px solid ${colors.borderLight}`;

export const outline = css`
  outline: none;
  box-shadow: 0 0 0 2px ${colors.blueLightBG};
`;

export const smallRadius = "4px";
export const regularRadius = "8px";
export const bigRadius = "10px";
export const hugeRadius = "20px";
export const ultraHugeRadius = "24px";
