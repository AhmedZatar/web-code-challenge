import { Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ boxShadow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 1.25rem",
        }}
      >
        <Link to="/">
          <Box
            component="img"
            src="/assets/logo.svg"
            alt="Logo"
            width={{ xs: 130, sm: 200 }}
          />
        </Link>

        <Typography
          variant="h1"
          fontSize={{ xs: 15, sm: 20 }}
          fontWeight="bold"
          pt={1}
        >
          Flight Inspirations
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
