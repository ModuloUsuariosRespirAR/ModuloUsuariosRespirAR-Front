/* eslint-disable import/no-anonymous-default-export */
import typography from "../../base/typography";
import colors from "../../base/colors";

const { size } = typography;
const { text } = colors;

export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};
