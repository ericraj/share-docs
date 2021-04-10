import { createGlobalStyle } from "styled-components";
import { Theme } from "./../types/theme";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }: { theme: Theme }) => theme.background};
    color: ${({ theme }: { theme: Theme }) => theme.color};
    height: 100vh;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }`;
