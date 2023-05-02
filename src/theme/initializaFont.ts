import hellixRegularFont from "../fonts/Hellix-Regular.woff2";
import interRegularFont from "../fonts/Inter-Regular.woff2";
import { hellixFontName, interFontName } from "./fonts";

const fontFace = (
  name: string,
  files: { src: string; format: string }[],
  fontWeight = "normal",
  fontStyle = "normal"
) => {
  const sources = files
    .map(({ src, format }) => `url(${src}) format("${format}")`)
    .join(",");

  return `
      @font-face{
          font-family: "${name}";
          src: ${sources};
          font-weight: ${fontWeight};
          font-style: ${fontStyle};
      }
    `;
};

const generateFontsString = () =>
  [
    fontFace(
      hellixFontName,
      [{ src: hellixRegularFont, format: "woff2" }],
      "400"
    ),
    fontFace(
      interFontName,
      [{ src: interRegularFont, format: "woff2" }],
      "400"
    ),
  ].join("\n");

export const initializeFontFace = () => {
  const style = document.createElement("style");
  style.innerHTML = generateFontsString();
  document.head.appendChild(style);
};
