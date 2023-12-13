import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateAndTimePicker({maxDate, minDate, handleSelection}) {
    const handleDateTimeSelection = (newDate) =>{ 
        const formattedDateTime = newDate.format("YYYY-MM-DDTHH:mm:ss");
        console.log("Formatted DateTime: ", formattedDateTime);
        handleSelection(formattedDateTime)
      }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker onChange={handleDateTimeSelection} label="Date" maxDate={maxDate || undefined} minDate={minDate || undefined} />
      </DemoContainer>
    </LocalizationProvider>
  );
}