import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import * as Yup from "yup";

import { flightStore } from "../stores/flightStore";

import { DatePicker } from "@mui/x-date-pickers";
import { TextField, Button, Box } from "@mui/material";

const validationSchema = Yup.object({
  origin: Yup.string()
    .length(3, "origin must be IATA code")
    .required("Origin is required"),
  departureDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
    .test("max180days", "Date must be within 180 days from today", (value) => {
      if (!value) return false;
      const today = dayjs();
      const maxDate = today.add(180, "day");

      const date = dayjs(value);
      return date.isAfter(today.subtract(1, "day")) && date.isBefore(maxDate);
    })
    .required("Departure date is required"),
});

const FlightSearchForm = observer(() => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const formik = useFormik({
    initialValues: {
      origin: "MAD",
      departureDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      flightStore.fetchFlights(
        values.origin.toUpperCase(),
        values.departureDate
      );
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", gap: 2 }}
    >
      <TextField
        label="Origin (IATA Code)"
        variant="outlined"
        name="origin"
        value={formik.values.origin}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.origin && Boolean(formik.errors.origin)}
        helperText={formik.touched.origin ? formik.errors.origin || " " : " "}
        size="small"
      />

      <DatePicker
        label="Departure Date"
        value={selectedDate}
        onChange={(date) => {
          if (!date) return;
          setSelectedDate(date);
          formik.setFieldValue("departureDate", date.format("YYYY-MM-DD"));
        }}
        disablePast
        maxDate={dayjs().add(180, "day")}
        slotProps={{
          textField: {
            variant: "outlined",
            name: "departureDate",
            error:
              formik.touched.departureDate &&
              Boolean(formik.errors.departureDate),
            helperText: formik.touched.departureDate
              ? formik.errors.departureDate || " "
              : " ",
            size: "small",
          },
          openPickerIcon: {
            sx: {
              color: "primary.main",
            },
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        sx={{ height: 40 }}
        disabled={flightStore.loading}
      >
        Search
      </Button>
    </Box>
  );
});

export default FlightSearchForm;
