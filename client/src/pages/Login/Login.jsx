import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveuser } from "../../features/User";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";
import Spinnerf from "../../Components/Spinnerf";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import loginimg from "./loginimg.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target

    if (name === "rememberMe") {
      setRememberMe(checked);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(formData);
      const response = await axios.post(
        "https://parin-polymer-server.vercel.app/user/login",
        formData
      );
      console.log(response.data);
      const user = {
        email: response.data.email,
        username: response.data.username,
        token: response.data.token,
      };

      localStorage.setItem("user", JSON.stringify(user));
      dispatch(
        saveuser({
          email: user.email,
          username: user.username,
          token: user.token,
        })
      );
      navigate(`/`);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
      setAlert(
        <Alert
          style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
          variant="filled"
          severity="error"
        >
          {error.response.data.error}
        </Alert>
      );
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center" id="login">
      {loading && <Spinnerf />} <Stack spacing={2}>{alert}</Stack>
      <div className="flex flex-col justify-center items-center w-1/2 md:w-full">
        <form
          onSubmit={handleSubmit}
          className="rounded md:w-full w-11/12 flex flex-col gap-5 px-14 justify-center bg-white md:py-12 md:px-6"
        >
          <p className="text-navyblue text-3xl font-semibold">Log in </p>

          <TextField
            id="outlined-basic"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            label="Email ID"
            onChange={handleChange}
            className="w-full rounded"
            required
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              className="w-full rounded"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <button
            type="submit"
            className="bg-blue border-1 border-solid border-blue text-white rounded w-full py-3"
          >
            Login
          </button>
          <p className="self-center text-center text-bluepurple font-light text-base md:text-sm">
            Don't have an Account ?
            <Link to="/signup" className="text-navyblue font-bold text-base">
              Create Account
            </Link>
          </p>
        </form>
      </div>{" "}
      <img src={loginimg} className="w-1/2 md:hidden object-cover" />
    </section>
  );
};

export default Login;
