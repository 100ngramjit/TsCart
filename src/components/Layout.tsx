import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../themes/themes";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";
import useLocalStorageState from "Hooks/useLocalStorage";

const Layout = () => {
  const [mode, setMode] = useLocalStorageState("mode", "light");

  const changeTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />

      <Toolbar />
      <Outlet />
    </ThemeProvider>
  );
};

export default Layout;
