import * as React from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectChip({
  options,
  label,
  placeholder,
  onChange,
  readOnly,
  defaultValue,
  value,
  disabled,
  freeSolo,
}) {
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={options}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      readOnly={readOnly}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      freeSolo={freeSolo}
    />
  );
}
