import PropTypes from "prop-types";

import Icon from "@mui/material/Icon";

import Box from "../../Box";
import Typography from "../../Typography";

function RotatingCardFront({ color, image, icon, title, description }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      borderRadius="lg"
      coloredShadow={color}
      width="100%"
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: ({
          palette: { gradients },
          functions: { linearGradient, rgba },
        }) =>
          `${linearGradient(
            rgba(
              gradients[color] ? gradients[color].main : gradients.info.main,
              0.85
            ),
            rgba(
              gradients[color] ? gradients[color].main : gradients.info.main,
              0.85
            )
          )}, url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
      }}
    >
      <Box py={12} px={3} textAlign="center" lineHeight={1}>
        {icon && (
          <Typography variant="h2" color="white" my={2}>
            {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
          </Typography>
        )}
        <Typography variant="h3" color="white" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="white" opacity={0.8}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

RotatingCardFront.defaultProps = {
  color: "info",
  icon: "",
};

RotatingCardFront.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

export default RotatingCardFront;
