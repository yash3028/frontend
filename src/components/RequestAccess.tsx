import { useEffect, useState } from "react";
import { get_request, post_request } from "../services/Request";

function RequestAccess() {
  const [software, setSoftware] = useState("");
  const [accessType, setAccessType] = useState("");
  const [reason, setReason] = useState("");
  const [softwareList, setSoftwareList] = useState([]);

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
      alert("Request submitted");
    } catch {
      alert("Failed to submit request");
    }
  };

  return (
    <div>
      <h2>Request Access</h2>
        <select>
        {softwareList.map((software:any)=>(
            <option value={software.id} onChange={handleRequest}>{software.description}</option>   
        ))}
        </select>
      <input
        placeholder="Access Type (Read/Write/Admin)"
        onChange={(e) => setAccessType(e.target.value)}
      />
      <input placeholder="Reason" onChange={(e) => setReason(e.target.value)} />
      <button onClick={handleRequest}>Submit Request</button>
    </div>
  );
}

export default RequestAccess;
