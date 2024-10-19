// ThemeContext.ts
import React from "react";

export const themes = {
  light: {
    background: "#d3d3d3",
    foreground: "black",
    noteColor: "White",
    textColor: 'Black'
  },
  dark: {
    background: "#636363",
    foreground: "white",
    noteColor: "Black",
    textColor: "White"
  },
};

export const ThemeContext = React.createContext(themes.light);
