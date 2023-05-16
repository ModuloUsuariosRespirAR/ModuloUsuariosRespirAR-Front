/* eslint-disable import/no-anonymous-default-export */
import pxToRem from "../../functions/pxToRem";

export default {
  styleOverrides: {
    root: {
      marginTop: 0,
      marginBottom: 0,
      padding: `${pxToRem(8)} ${pxToRem(24)} ${pxToRem(24)}`,
    },
  },
};
