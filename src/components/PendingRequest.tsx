import { useEffect, useState } from "react";
import { get_request } from "../services/Request";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";

function PendingRequest() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSoftware,setTotalSoftware] = useState(1)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const fetchRequests = async (pageNum = 1) => {
    try {
      const res = await get_request(`/api/request/pending?page=${pageNum}&limit=5`);
      setRequests(res.data.data);
      setPage(res.data.page);
      setTotalSoftware(res.data.totalSoftware)
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setSnackbarMessage("Failed to fetch requests");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchRequests(page);
  }, [page]);

  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/request/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update");

      setSnackbarMessage(data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchRequests(page);
    } catch (error: any) {
      setSnackbarMessage(error.message || "Failed to update");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Pending Requests
      </Typography>

      <Stack spacing={2}>
        {requests.map((req: any) => (
          <Card key={req.id}>
            <CardContent>
              <Typography variant="h6">
                {req.software.name} - {req.accessType}
              </Typography>
              <Typography color="text.secondary">Reason: {req.reason}</Typography>
              <Typography color="text.secondary">User: {req.user.username}</Typography>

              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => updateStatus(req.id, "Approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => updateStatus(req.id, "Rejected")}
                >
                  Reject
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, val) => setPage(val)}/>
          <Typography variant="body2" color="text.secondary" mt={1}>
          Total Software: {totalSoftware}
        </Typography>
      </Box>

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

export default PendingRequest;
