import React, { useState, useEffect } from "react";
import "./Account.scss";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import imgplaceholder from "./imgplaceholder.png";
import { Link, useNavigate } from "react-router-dom";
import Spinnerf from "../../Components/Spinnerf";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import emptycart from "./emptycart.jpeg";
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

export default function Account() {
  const user = useSelector((state) => state.user.user);
  const userDetails = useSelector((state) => state.userDetails.userDetails);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    primary_address: "",
    secondary_address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userDetails);
    setFormData({
      ...formData,
      username: userDetails.username,
      phone: userDetails.phone,
      primary_address: userDetails.primary_address,
      secondary_address: userDetails.secondary_address,
      pincode: userDetails.pincode,
    });
  }, [userDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const pinRegex = /^\d{6}$/;

      if (!pinRegex.test(formData.pincode)) {
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="error"
          >
            Invalid Pincode
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        return;
      }
      setLoading(true);

      const response = await axios.put(
        `https://parin-polymer-server.vercel.app/user/account/${user.email}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAlert(
        <Alert
          style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
          variant="filled"
          severity="success"
        >
          Updated successfully
        </Alert>
      );
      setTimeout(() => setAlert(null), 5000);
      setLoading(false);
      setLoading(false);
    } catch (error) {
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
      setLoading(false);
    }
  };

  const viewallcoursesf = () => {
    navigate("/#products");
  };

  return (
    <>
      {loading ? (
        <Spinnerf />
      ) : (
        <>
          <section
            id="account"
            className="w-full flex-col flex items-center  py-20"
            style={{ marginTop: "12vh" }}
          >
            <Stack spacing={2}>{alert}</Stack>
            {user.username && (
              <div className="account-intro w-full flex justify-center">
                <p className="w-3/5 md:w-11/12 font-semibold text-black2 text-xl md:text-lg text-center py-16 ">
                  Hi {user.username}
                </p>
              </div>
            )}{" "}
            {formData && formData.username && (
              <div className="w-3/4 flex flex-col gap-3">
                <form
                  onSubmit={handleSubmit}
                  className="rounded md:w-full w-full mt-8 flex flex-col gap-4 px-14 justify-center bg-white md:py-12 md:px-6"
                >
                  <div className="flex w-full justify-between md:flex-col md:gap-5">
                    <TextField
                      variant="outlined"
                      type="text"
                      name="username"
                      label="Username"
                      value={formData.username}
                      onChange={handleChange}
                      className="md:w-full rounded custom-width-45"
                      required
                    />
                    <TextField
                      variant="outlined"
                      type="number"
                      name="phone"
                      label="Phone No"
                      value={formData.phone}
                      onChange={handleChange}
                      className="md:w-full rounded custom-width-45"
                      required
                    />
                  </div>

                  <TextField
                    variant="outlined"
                    type="text"
                    name="primary_address"
                    value={formData.primary_address}
                    label="Flat/Building No, Area, Street , Sector"
                    onChange={handleChange}
                    className="w-full rounded"
                    required
                  />
                  <div className="flex w-full justify-between md:flex-col md:gap-5">
                    <div className="flex flex-col custom-width-45 md:w-full">
                      <TextField
                        variant="outlined"
                        type="text"
                        name="secondary_address"
                        value={formData.secondary_address}
                        label="Town/city"
                        onChange={handleChange}
                        className="w-full rounded"
                        required
                      />
                    </div>
                    <div className="flex flex-col custom-width-45 md:w-full">
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        name="pincode"
                      />
                    </div>
                  </div>
                  <button
                    className="bg-darkblue border-1 border-solid border-darkblue text-white rounded w-full py-3"
                    type="submit"
                  >
                    save
                  </button>
                </form>
              </div>
            )}
            {/* <div className="flex flex-col justify-center w-full items-center py-16">
              <div className="w-3/4 flex flex-col gap-6 md:w-11/12">
                {enrolledcourses && enrolledcourses.length > 1 && (
                  <p className=" md:w-11/12 font-semibold text-black2 text-xl md:text-lg">
                    Courses
                  </p>
                )}
                <div className="flex gap-8 md:flex-col flex-wrap">
                  {enrolledcourses && enrolledcourses.length > 0 ? (
                    <>
                      {enrolledcourses.map((item, index) => (
                        <Link
                          to={`/courses/${item.currentlywatching.courseId}/${user.email}/${item.currentlywatching.chapterId}/${item.currentlywatching.contentId}`}
                          key={item.courseId}
                        >
                          <div className="cursor-pointer relative account-courses-card gap-1 rounded-xl flex flex-col items-center">
                            <img
                              src={item.thumbnail || imgplaceholder}
                              className="h-72 w-full object-cover rounded-xl"
                            />

                            <p className="w-11/12 font-medium text-black1 text-xl py-4">
                              {item.courseName}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {enrolledcourses && enrolledcourses.length == 0 && (
                        <section className="w-screen flex flex-col gap-4 items-center justify-center">
                          <img
                            src={emptycart}
                            alt="no courses enrolled"
                            className="w-1/4 md:w-1/2"
                          />
                          <p className="text-4xl md:text-3xl font-semibold">
                            No courses Enrolled
                          </p>
                          <p className="text-lg md:text-base font-normal">
                            Enroll courses to watch here
                          </p>
                          <button
                            className="rounded-xl bg-blue text-white py-2 px-4"
                            onClick={viewallcoursesf}
                          >
                            View All Courses
                          </button>
                        </section>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div> */}
          </section>
        </>
      )}
    </>
  );
}
