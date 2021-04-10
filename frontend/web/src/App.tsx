import { Fragment, useState } from "react";
import { ThemeProvider } from "styled-components";
import ToggleTheme from "./components/ToggleTheme";
import { GlobalStyles } from "./styles/global";
import { darkTheme, lightTheme } from "./themes";
import { ThemeMode } from "./types/theme";

const App = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    themeMode === "light" ? setThemeMode("dark") : setThemeMode("light");
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <Fragment>
        <GlobalStyles />
        <h1>Hello World !</h1>
        <br />
        <ToggleTheme toggleTheme={toggleTheme} />
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
