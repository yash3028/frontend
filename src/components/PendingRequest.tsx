import { useEffect, useState } from "react";
import { get_request, post_request } from "../services/Request";

function PendingRequest() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const token = localStorage.getItem("token");
      const res = await get_request("/requests");
      setRequests(res.data);
    }
    fetchRequests();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token");
    try {
      await post_request(`/requests/${id}`, { status });
      alert("Updated successfully");
    } catch {
      alert("Failed to update");
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.map((req: any) => (
        <div key={req.id}>
          <p>{req.software} - {req.accessType}</p>
          <p>Reason: {req.reason}</p>
          <button onClick={() => updateStatus(req.id, "Approved")}>Approve</button>
          <button onClick={() => updateStatus(req.id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default PendingRequest;
