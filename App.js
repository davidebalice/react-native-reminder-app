import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import Navigator from "./router/Navigator";
import BottomBar from "./components/BottomBar";
import { AuthProvider } from "./context/authContext";
import ThemeContext from "./context/themeContext";
import { lightTheme } from "./context/themes";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <PaperProvider theme={theme}>
              <Navigator />
              <BottomBar />
            </PaperProvider>
          </ThemeContext.Provider>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
