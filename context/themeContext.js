import React,{useState} from "react";
import { lightTheme } from "./themes";



const ThemeContext = React.createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export default ThemeContext;
