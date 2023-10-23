import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Route from "./Route";
import TestState from "./State/Function/Main";
import UseEffectState from "./State/UseEffect/UseEffectContext";
import UseState from "./State/UseState/UseContext";
import AppAlert from "./utils/AppAlert/AppAlert";
import AppLoader from "./utils/AppLoader/AppLoader";
import TopLoadingBar from "./utils/TopLoadingBar/TopLoadingBar";
import TopNav from "./utils/TopNav/TopNav";

// mulitple screen size xs,sm,md,lg,xl

function App() {
  const [first, setfirst] = useState([
    { primary: "rgb(29, 110, 183)", secondary: "#01d293", mode: "light" },
    { primary: "#ffff", secondary: "#01d293", mode: "light" },
  ]);
  // Get the value of a CSS variable
  // const variableValue = getComputedStyle(
  //   document.documentElement
  // ).getPropertyValue("--primary-color");
  // console.log(`🚀 ~ variableValue:`, variableValue);
  // document.documentElement.style.setProperty("--primary-color", "#300e0e");

  const [themeIndex, setThemeIndex] = useState(0);
  const theme = createTheme({
    palette: {
      mode: first[themeIndex].mode,
      primary: {
        main: first[themeIndex].primary,
      },
      secondary: {
        main: first[themeIndex].secondary,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UseState first={first} setFirst={setfirst}>
          <TestState>
            <UseEffectState>
              <TopLoadingBar />
              <AppLoader />
              <AppAlert />
              <TopNav />
              <div style={{ height: "100%", width: "100%" }}>
                <Route />
              </div>
            </UseEffectState>
          </TestState>
        </UseState>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
