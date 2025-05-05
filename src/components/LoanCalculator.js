import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LoanCalculator = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(7.5);
  const [months, setMonths] = useState(60);
  const [emi, setEmi] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [converted, setConverted] = useState(null);
  const [rates, setRates] = useState({});

  const calculateEMI = () => {
    const R = rate / (12 * 100);
    const emiVal =
      (amount * R * Math.pow(1 + R, months)) / (Math.pow(1 + R, months) - 1);
    setEmi(emiVal.toFixed(2));
  };

  const fetchRates = async () => {
    try {
      const res = await axios.get(
        "https://v6.exchangerate-api.com/v6/836f2af5ca481ab2ee536d35/latest/INR"
      );
      setRates(res.data.conversion_rates);
    } catch (err) {
      console.error("Error fetching exchange rates", err);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (emi && rates[currency]) {
      setConverted((emi * rates[currency]).toFixed(2));
    }
  }, [emi, currency, rates]);

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5">EMI Calculator</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Loan Amount"
            fullWidth
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Annual Interest Rate (%)"
            fullWidth
            type="number"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Loan Duration (months)"
            fullWidth
            type="number"
            value={months}
            onChange={(e) => setMonths(+e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Currency"
            fullWidth
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
            {Object.keys(rates).map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={calculateEMI}>
            Calculate EMI
          </Button>
        </Grid>
        {emi && (
          <Grid item xs={12}>
            <Typography>
              EMI: ₹{emi} ({converted} {currency})
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default LoanCalculator;
