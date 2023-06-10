import PropTypes from "prop-types";

import { Button } from "@mui/material";

import Box from "../../Box";
import Typography from "../../Typography";

function Card({ image, name, ...rest }) {
  const imageTemplate = (
    <Box
      bgColor="#FDEFE6"
      borderRadius="xl"
      shadow="lg"
      minHeight="20rem"
      minWidth="30rem"
      sx={{
        overflow: "hidden",
        transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
        transformOrigin: "50% 0",
        backfaceVisibility: "hidden",
        willChange: "transform, box-shadow",
        transition: "transform 200ms ease-out",

        "&:hover": {
          transform:
            "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
        },
      }}
      {...rest}
    >
      <br />
      <Box position="absolute" top={0} right={0} zIndex={2} p={1}>
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
        <g
          id="lock-black"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="padlock"
            transform="translate(7.000000, 5.000000)"
            fill="#FFFFFF"
            fillRule="nonzero"
          >
            <path d="M5,0 C3.16666667,0 1.66666667,1.5 1.66666667,3.33333333 L1.66666667,4.58333333 C0.666666667,5.5 0,6.83333333 0,8.33333333 C0,11.0833333 2.25,13.3333333 5,13.3333333 C7.75,13.3333333 10,11.0833333 10,8.33333333 C10,6.83333333 9.33333333,5.5 8.33333333,4.58333333 L8.33333333,3.33333333 C8.33333333,1.5 6.83333333,0 5,0 Z M5.83333333,8.91666667 L5.83333333,10.8333333 L4.16666667,10.8333333 L4.16666667,8.91666667 C3.66666667,8.66666667 3.33333333,8.08333333 3.33333333,7.5 C3.33333333,6.58333333 4.08333333,5.83333333 5,5.83333333 C5.91666667,5.83333333 6.66666667,6.58333333 6.66666667,7.5 C6.66666667,8.08333333 6.33333333,8.66666667 5.83333333,8.91666667 Z M6.66666667,3.66666667 C6.16666667,3.41666667 5.58333333,3.33333333 5,3.33333333 C4.41666667,3.33333333 3.83333333,3.41666667 3.33333333,3.66666667 L3.33333333,3.33333333 C3.33333333,2.41666667 4.08333333,1.66666667 5,1.66666667 C5.91666667,1.66666667 6.66666667,2.41666667 6.66666667,3.33333333 L6.66666667,3.66666667 Z" />
          </g>
        </g>
      </Box>
      <Box
        component="img"
        src={image}
        alt={name}
        height="100%"
        width="100%"
        my="auto"
      />{" "}
    </Box>
  );

  return <Box position="relative">{imageTemplate}</Box>;
}

Card.defaultProps = {
  name: "",
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  count: PropTypes.number,
};

export default Card;
