import { FC } from "react";
import styled from "styled-components";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { StyledButton } from "../styled-components/button";
import { Theme } from "../types/theme";

export interface ToggleThemeProps {
  toggleTheme: () => void;
}

const ToggleButton = styled(StyledButton)`
  background: ${({ theme }: { theme: Theme }) => theme.gradient};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 5rem;
  height: 2.5rem;

  svg {
    height: auto;
    width: 1.3rem;
    transition: all 0.3s linear;

    // sun icon
    &:first-child {
      transform: ${({ theme }: { theme: Theme }) =>
        theme.mode === "light" ? "translateY(0)" : "translateY(100px)"};
    }

    // moon icon
    &:nth-child(2) {
      transform: ${({ theme }: { theme: Theme }) =>
        theme.mode === "light" ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

const ToggleTheme: FC<ToggleThemeProps> = ({ toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme}>
      <SunIcon />
      <MoonIcon />
    </ToggleButton>
  );
};

export default ToggleTheme;
