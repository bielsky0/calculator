import styled, { css } from "styled-components";
import { fontFamily, fontWeight } from "./fonts";

export const heading1 = css`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.regular};
  font-size: 39px;
  line-height: 43px;
`;

export const heading2 = css`
  ${heading1};
  font-size: 31px;
  line-height: 43px;
`;

export const heading3 = css`
  ${heading1};
  font-size: 20px;
  line-height: 28px;
`;

export const heading4 = css`
  ${heading1};
  font-size: 13px;
  line-height: 15px;
  font-weight: ${fontWeight.regular};
`;

export const H1 = styled.h1`
  ${heading1}
`;
export const H2 = styled.h2`
  ${heading2}
`;
export const H3 = styled.h3`
  ${heading3}
`;
export const H4 = styled.h4`
  ${heading4}
`;

export const paragraph = css`
  font-family: ${fontFamily.primary};
  font-size: 16px;
  line-height: 22px;
`;

export const label = css`
  font-family: ${fontFamily.primary};
  font-size: 12px;
  line-height: 17px;
  font-weight: ${fontWeight.regular};
  letter-spacing: 0.05em;
  text-transform: none;
`;

export const Label = styled.p`
  ${label}
`;

export const Paragraph = styled.p`
  ${paragraph}
`;
