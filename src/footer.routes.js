import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import Typography from "./components/Typography";

const date = new Date().getFullYear();

const footerRoutes = [
  {
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
    copyright: (
      <Typography variant="button" fontWeight="regular">
        All rights reserved. Copyright &copy; {date} Material Kit by ORT
        <Typography
          component="a"
          href="https://www.creative-tim.com"
          target="_blank"
          rel="noreferrer"
          variant="button"
          fontWeight="regular"
        >
          Grupo 2
        </Typography>
        .
      </Typography>
    ),
  },
];

export default footerRoutes;
