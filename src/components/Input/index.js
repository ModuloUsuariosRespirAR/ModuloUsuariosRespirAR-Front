import { forwardRef } from "react";

import PropTypes from "prop-types";

import InputRoot from "../Input/InputRoot";

const Input = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <InputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

Input.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

Input.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;
