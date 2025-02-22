import { observer } from "mobx-react-lite";

import { flightStore } from "./stores/flightStore";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Grid2 as Grid, Container, Paper } from "@mui/material";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";
import FlightSearchForm from "./components/FlightSearchForm";
import FlightTable from "./components/FlightTable";
import SaveButton from "./components/SaveButton";

const App = observer(() => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={6}>
          <Grid size={12}>
            <Paper sx={{ p: 2 }} elevation={1}>
              <Grid container size={12} spacing={2}>
                <Grid size={10}>
                  <FlightSearchForm />
                </Grid>
                <Grid size={2}>
                  <SaveButton onClick={() => flightStore.saveChanges()} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid size={12}>
            <Paper sx={{ p: 2 }} elevation={6}>
              {flightStore.loading ? (
                <Spinner />
              ) : flightStore.error ? (
                <ErrorMessage message={flightStore.error} />
              ) : (
                <FlightTable />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
});

export default App;
