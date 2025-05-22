import { useState } from "react";
import { post_request } from "../services/Request";

function CreateSoftware() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState('');

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      await post_request("/api/software", { name, description, accessLevels });
      alert("Software created");
    } catch {
      alert("Failed to create software");
    }
  };

  return (
    <div>
      <h2>Create Software</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Access Levels" onChange={e => setAccessLevels(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
export default CreateSoftware;
