import * as React from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function MultipleSelectChip({
  options,
  label,
  placeholder,
  onChange,
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
    />
  );
}
