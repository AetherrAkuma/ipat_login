import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", { username, password }, { headers: { "Content-Type": "application/json" } });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      // add error handling about username already exist then navigate to login page
      if (error.response?.data?.message === "Username already exist") {
        alert("Username already exist, please login");
        navigate("/login");
      }

      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Container>
      <Typography>Register</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
      <></>
      <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/login")}>
        Login
      </Button>
    </Container>
  );
};

export default Register;
