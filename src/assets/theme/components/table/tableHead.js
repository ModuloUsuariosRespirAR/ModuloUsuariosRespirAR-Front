/* eslint-disable import/no-anonymous-default-export */
import borders from "../../base/borders";

import pxToRem from "../../functions/pxToRem";

const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      display: "table-row-group",
      padding: `${pxToRem(16)} ${pxToRem(16)} 0  ${pxToRem(16)}`,
      borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`,
    },
  },
};
