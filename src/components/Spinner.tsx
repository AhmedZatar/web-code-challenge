import { CircularProgress, Box } from "@mui/material";

const Spinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height={100}>
    <CircularProgress size={50} color="primary" />
  </Box>
);

export default Spinner;
