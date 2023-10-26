import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Route from "./Route";
import TestState from "./State/Function/Main";
import UseEffectState from "./State/UseEffect/UseEffectContext";
import UseState from "./State/UseState/UseContext";
import MiniDrawer from "./components/app-layout/components/appdrawer";
import SwipeableTemporaryDrawer from "./components/app-layout/components/swipable-drawer";
import AppAlert from "./utils/AppAlert/AppAlert";
import AppLoader from "./utils/AppLoader/AppLoader";
import TopLoadingBar from "./utils/TopLoadingBar/TopLoadingBar";

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

  const [themeIndex, setThemeIndex] = useState(1);
  // const theme = createTheme({
  //   palette: {
  //     mode: first[themeIndex].mode,
  //     primary: {
  //       main: first[themeIndex].primary,
  //     },
  //     secondary: {
  //       main: first[themeIndex].secondary,
  //     },
  //   },
  // });
  return (
    // <ThemeProvider>
    <BrowserRouter>
      <UseState first={first} setFirst={setfirst}>
        <TestState>
          <UseEffectState>
            <TopLoadingBar />
            <AppLoader />
            <AppAlert />
            <div className="block sm:hidden lg:hidden xl:hidden">
              <SwipeableTemporaryDrawer />
              <div style={{ height: "100%", width: "100%" }}>
                <Route />
              </div>
            </div>
            <div className="hidden sm:block lg:block xl:block h-full w-full">
              <MiniDrawer>
                <div style={{ height: "100%", width: "100%" }}>
                  <Route />
                </div>
              </MiniDrawer>
            </div>
          </UseEffectState>
        </TestState>
      </UseState>
    </BrowserRouter>
    // {/* </ThemeProvider> */}
  );
}

export default App;
