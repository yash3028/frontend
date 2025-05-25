import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";



function Home(){
    const navigate = useNavigate()
    const handlelogin = async()=>{
        navigate('/login')
    }

    const handleSign = async()=>{
        navigate('/signup')
    }

    return (
    <Stack direction="row" spacing={2}>
      <Button onClick={handlelogin} variant="outlined">Login</Button>
      <Button onClick={handleSign} variant="outlined">SignUp</Button>
    </Stack>
  );
}

export default Home;