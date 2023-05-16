import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Box from "../../Box";
import Typography from "../../Typography";

function CenteredFooter({ socials, light }) {
  const year = new Date().getFullYear();

  const renderSocials = socials.map((social) => (
    <Typography
      key={social.link}
      component={Link}
      href={social.link}
      variant="body2"
      color={light ? "white" : "secondary"}
      fontWeight="regular"
    >
      {social.icon}
    </Typography>
  ));

  return (
    <Box component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Stack
            display="flex"
            direction="row"
            justifyContent="center"
            spacing={3}
            mt={1}
            mb={3}
          >
            {renderSocials}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <Typography variant="body2" color={light ? "white" : "secondary"}>
            Copyright &copy; {year} Material by ORT{" "}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

CenteredFooter.defaultProps = {
  socials: [
    {
      icon: <FacebookIcon fontSize="small" />,
      link: "https://www.facebook.com/institutociudadesfuturo/",
    },
    {
      icon: <TwitterIcon fontSize="small" />,
      link: "https://twitter.com/iciudadesfuturo",
    },
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "https://www.instagram.com/iciudadesfuturo/",
    },
  ],
  light: false,
};

CenteredFooter.propTypes = {
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};

export default CenteredFooter;
