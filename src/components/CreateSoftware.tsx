import { useState } from "react";
import { post_request } from "../services/Request";
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography,type SelectChangeEvent } from "@mui/material";

const access = ["Read", "Write", "Admin"];
function CreateSoftware() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accesslevels, setAccessLevels] = useState<string[]>([]);

  const handleSelect = (event: SelectChangeEvent<string[]>) => {
  const {
    target: { value },
  } = event;
  setAccessLevels(typeof value === "string" ? value.split(",") : value);
};

  const handleCreate = async () => {
    try {
      await post_request("/api/software", { name, description, accesslevels });
      alert("Software created");
    } catch {
      alert("Failed to create software");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Software
      </Typography>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Access Levels</InputLabel>
        <Select
          multiple
          value={accesslevels}
          onChange={handleSelect}
          input={<OutlinedInput label="Access Levels" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {access.map((level) => (
            <MenuItem key={level} value={level}>
              <Checkbox checked={accesslevels.includes(level)} />
              <ListItemText primary={level} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        fullWidth
        sx={{ mt: 2 }}
      >
        Create
      </Button>
    </Box>
  );
}
export default CreateSoftware;
