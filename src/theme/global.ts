import { createGlobalStyle } from "styled-components";
import { border, color, font } from ".";

export const NO_SCROLL_CLASSNAME = "noScroll";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    color: ${color.text};
    font-family: ${font.fontFamily.primary};

    .ReactModal__Body--open{
      position: absolute !important;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  body{
    background: ${color.bluebackGround};
    /* background-image: ${color.midDarkGradient}; */
    margin: 0;
  }
  
  body.${NO_SCROLL_CLASSNAME} {
    overflow: hidden;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  *:focus {
    ${border.outline};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    
    &:focus{
      box-shadow: none;
    }
  }
  
  button{
    &:focus{
      box-shadow: none;
    }
  }
  div[role="button"]{

    &:focus{
      box-shadow: none;
    }
  }
  input{
    -webkit-tap-highlight-color: transparent;
  }


  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
