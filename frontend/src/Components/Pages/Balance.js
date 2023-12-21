import React, {useEffect, useState} from 'react';
import { Grid, Container, Typography, IconButton, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import Popup from '../Popup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
function Balance({userId,userType}) {
  const [amount, setAmount] = useState(0)
  const [popupEnabled, setPopupEnabled] = useState(false)
  const [currentBalance, setBalance] = useState(0)

  const sendRequest = async () =>  {
    console.log("send ")
    const formData = new FormData();
    formData.append('money', amount); 
    try {
        const response = await axios.post(`http://localhost:8080/enthusiast/${userId}/increase_balance`, formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error increasing balance', error);
      }
    handleClose()
    setAmount(0)
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)

  }
  const submit = () => {
    console.log("submit")
    setPopupEnabled(true)
  }

  function handleClose() {
    setPopupEnabled(false)
  }

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enthusiast/${userId}`);
        const enthusiast = response.data;
        setBalance(enthusiast.balance)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    if (userId !== -1) {
      getBalance();
    }
  }, [userId]);
  const isSubmitDisabled = !amount

  return (
    <Container sx={{ mr: 2, ml:8, mt: 5 }}>
      {(popupEnabled &&
        <Popup 
        state={popupEnabled}
        handleClose={handleClose} 
        dialogTitle={"Are you sure to increase your balance"} 
        handleRequest={sendRequest}
        > 
        </Popup>)}
    
              <Grid container direction="column" justifyContent="center" sx={{ padding: 2 }}>
                <Typography  variant="h5" gutterBottom>Add Balance</Typography>
                <Typography  variant="h6" gutterBottom>Current Balance : {currentBalance}</Typography>
                <TextField onChange={handleAmountChange} value = {amount} fullWidth label="Amount" variant="outlined" margin="normal" />
                <Button  onClick={submit} sx={{ mt: 2, backgroundColor: isSubmitDisabled ? "#65647a" : "#302F4D" }} variant="contained" color="primary" disabled={isSubmitDisabled}>
              Submit
            </Button>
              </Grid>
              <Grid container sx = {{mt:8,ml:15}}>
              </Grid>
    </Container>
  );
}

export default Balance;
