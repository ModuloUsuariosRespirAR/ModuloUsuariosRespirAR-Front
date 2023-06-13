import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  DialogTitle,
  Dialog,
  DialogActions,
  ListItemIcon,
  Checkbox,
  Divider,
} from "@mui/material";

export default function SimpleDialog(props) {
  const { onClose, open, check } = props;
  const [checked, setChecked] = React.useState("");
  const newChecked = [...checked];

  if (check !== null && check !== undefined && check !== "") {
    check.map((c) => {
      if (!newChecked.includes(c)) {
        newChecked.push(c);
        setChecked(newChecked);
      }
      return newChecked;
    });
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleClose = () => {
    onClose(checked);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.title}</DialogTitle>
      <Divider />
      <List sx={{ pt: 0 }}>
        {props.items.map((item) => (
          <ListItem>
            <ListItemButton key={item.id}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(item.id) !== -1}
                  tabIndex={-1}
                  inputProps={{ "aria-labelledby": item.id }}
                  onChange={handleToggle(item.id)}
                />
                {/* )} */}
              </ListItemIcon>
              <ListItemText id={item.id} primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <DialogActions>
        <Button variant="gradient" color="info" onClick={handleClose}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
