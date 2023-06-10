import { forwardRef } from "react";
import PropTypes from "prop-types";
import ButtonRoot from "./ButtonRoot";

const Button = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
    <ButtonRoot
      {...rest}
      ref={ref}
      color="primary"
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </ButtonRoot>
  )
);

Button.defaultProps = {
  size: "medium",
  variant: "outlined",
  color: "primary",
  circular: true,
  iconOnly: false,
};

Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "default",
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
