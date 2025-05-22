import { useState } from "react";
import { post_request } from "../services/Request";

function RequestAccess() {
  const [software, setSoftware] = useState('');
  const [accessType, setAccessType] = useState('');
  const [reason, setReason] = useState('');

  const handleRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      await post_request("/requests", { software, accessType, reason });
      alert("Request submitted");
    } catch {
      alert("Failed to submit request");
    }
  };

  return (
    <div>
      <h2>Request Access</h2>
      <input placeholder="Software Name" onChange={e => setSoftware(e.target.value)} />
      <input placeholder="Access Type (Read/Write/Admin)" onChange={e => setAccessType(e.target.value)} />
      <input placeholder="Reason" onChange={e => setReason(e.target.value)} />
      <button onClick={handleRequest}>Submit Request</button>
    </div>
  );
}

export default RequestAccess;
