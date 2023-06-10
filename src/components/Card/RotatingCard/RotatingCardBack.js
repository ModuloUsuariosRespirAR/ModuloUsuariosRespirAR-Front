import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import MuiLink from "@mui/material/Link";

import Box from "../../Box";
import Typography from "../../Typography";
import Button from "../../Button";

function RotatingCard({ color, image, title, description, action }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      coloredShadow={color}
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      zIndex={5}
      sx={{
        backgroundImage: ({
          palette: { gradients },
          functions: { linearGradient, rgba },
        }) =>
          `${linearGradient(
            rgba(
              gradients[color] ? gradients[color].main : gradients.warning.main,
              0.5
            ),
            rgba(
              gradients[color] ? gradients[color].main : gradients.warning.main,
              0.5
            )
          )}, url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <Box pt={12} pb={2} px={2} textAlign="center" lineHeight={1}>
        <Typography variant="h3" color="grey" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="grey" opacity={0.8}>
          {description}
        </Typography>
        {action && (
          <Box width="50%" mt={4} mb={2} mx="auto">
            {action.type === "external" ? (
              <Button
                component={MuiLink}
                href={action.route}
                target="_blank"
                rel="noreferrer"
                color="grey"
                size="small"
                fullWidth
              >
                {action.label}
              </Button>
            ) : (
              <Button
                component={Link}
                to={action.route}
                color="info"
                size="small"
                fullWidth
              >
                {action.label}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Setting default props for the RotatingCard
RotatingCard.defaultProps = {
  color: "info",
};

// Typechecking props for the RotatingCard
RotatingCard.propTypes = {
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
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default RotatingCard;
