import { Box, Typography } from "@mui/material";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Box mt={1} textAlign="center">
      <Typography color="error" fontWeight="bold">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
