import { Box, Button, Paper, Typography } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import React, { useState } from "react";
import {
  StyledPaper,
  FormTitle,
  FilterFormContainer,
} from "./FilterTable.styles";

function FilterTable() {
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [fromTime, setFromTime] = useState(dayjs());
  const [toTime, setToTime] = useState(dayjs());

  dayjs.locale("ar");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
      <StyledPaper>
        <FormTitle variant="h6">آخر الطلبات</FormTitle>

        <FilterFormContainer>
          <Button variant="contained" sx={{ background: "#8A1A9B" }}>
            عرض
          </Button>
          <DatePicker
            label="من التاريخ"
            value={fromDate}
            onChange={setFromDate}
          />
          <TimePicker
            label="من الوقت"
            value={fromTime}
            onChange={setFromTime}
          />
          <TimePicker label="إلى الوقت" value={toTime} onChange={setToTime} />
        </FilterFormContainer>
      </StyledPaper>
    </LocalizationProvider>
  );
}

export default FilterTable;
