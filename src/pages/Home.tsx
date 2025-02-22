import { observer } from "mobx-react-lite";

import { flightStore } from "../stores/flightStore";

import { Grid2 as Grid, Container, Paper } from "@mui/material";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightTable from "../components/FlightTable";
import SaveButton from "../components/SaveButton";

const HomePage = observer(() => {
  return (
    <Grid container spacing={6}>
      <Grid size={12}>
        <Paper sx={{ px: 2, pt: 4, pb: 1 }} elevation={4}>
          <Grid container size={12} spacing={2}>
            <Grid size={{ xs: 12, sm: 10 }}>
              <FlightSearchForm />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
              <SaveButton
                onClick={() => flightStore.saveChanges()}
                disabled={!flightStore.editedCells.size}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid size={12}>
        <Paper sx={{ p: 2 }} elevation={4}>
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
  );
});

export default HomePage;
