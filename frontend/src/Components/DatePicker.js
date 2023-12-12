import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({maxDate, handleSelection}) {
  const handleDateSelection = (newDate) =>{ 
    const formattedDate = `${newDate.year()}-${String(newDate.month() + 1).padStart(2, '0')}-${String(newDate.date()).padStart(2, '0')}`;
    console.log("Formatted LocalDate: ", formattedDate);
    handleSelection(formattedDate)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker onChange={handleDateSelection} label="Date" maxDate={maxDate || undefined} />
      </DemoContainer>
    </LocalizationProvider>
  );
}