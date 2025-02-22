import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        height: "70vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box textAlign="center">
        <Typography variant="h1" color="primary" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
