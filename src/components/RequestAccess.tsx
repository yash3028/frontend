import { useEffect, useState } from "react";
import { get_request, post_request } from "../services/Request";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { Grid } from "@mui/material";


const access = ["Read", "Write", "Admin"];

function RequestAccess() {
  const [software, setSoftware] = useState("");
  const [accessType, setAccessType] = useState("");
  const [reason, setReason] = useState("");
  const [softwareList, setSoftwareList] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    async function fetchRequests() {
      const softwares = await get_request("/api/software");
      setSoftwareList(softwares.data);
    }
    fetchRequests();
  }, []);

  const handleRequest = async () => {
    try {
      await post_request("/api/request", { software, accessType, reason });
      setSnackbarMessage("Request submitted");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setSoftware("");
      setAccessType("");
      setReason("");
    } catch {
      setSnackbarMessage("Failed to submit request");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
   return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 600 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Request Software Access
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} component="div">
            <FormControl fullWidth>
              <InputLabel>Select Software</InputLabel>
              <Select
                value={software}
                label="Select Software"
                onChange={(e) => setSoftware(e.target.value)}
              >
                {softwareList.map((software: any) => (
                  <MenuItem key={software.id} value={software.name}>
                    {software.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Access Level</InputLabel>
              <Select
                value={accessType}
                label="Access Level"
                onChange={(e) => setAccessType(e.target.value)}
              >
                {access.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Reason input (full row) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              multiline
              rows={3}
            />
          </Grid>

          {/* Submit button (full row) */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRequest}
            >
              Submit Request
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RequestAccess;
