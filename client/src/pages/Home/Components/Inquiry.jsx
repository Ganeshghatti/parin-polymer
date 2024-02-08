import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import validator from "validator";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Select, MenuItem } from "@mui/material";
import { Stack } from "@mui/material";
import Spinnerf from "../../../Components/Spinnerf";
import axios from "axios";

const Inquiry = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    companyGST: "",
    productName: "",
    productQuantity: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const alertfunction = (msg) => {
    setAlert(
      <Alert
        style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
        variant="filled"
        severity="success"
      >
        {msg}
      </Alert>
    );
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName &&
      !formData.lastName &&
      !formData.companyName &&
      !formData.companyGST &&
      !formData.productName &&
      !formData.productQuantity
    ) {
      alertfunction("Please Enter all the required fields");
    }

    if (!validator.isEmail(formData.email)) {
      alertfunction("Invalid email address");
    }
    if (!validator.isMobilePhone(formData.phone)) {
      alertfunction("Invalid phone number");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/form",
        formData
      );
      setAlert(
        <Alert
          style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
          variant="filled"
          severity="success"
        >
          {response.data.message}
        </Alert>
      );
      setTimeout(() => setAlert(null), 5000);
      setFormData({ email: "", name: "", phone: "", query: "" });
      setLoading(false);
    } catch (error) {
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
    <section
      id="contact"
      className="w-full flex items-center justify-center py-16"
    >
      {" "}
      {loading && <Spinnerf />}
      <Stack spacing={2}>{alert}</Stack>
      <div className="w-3/4 flex flex-col gap-8 bg-blue rounded-3xl p-16 md:w-11/12 md:p-6">
        <h2 className="uppercase text-6xl md:text-5xlfont-medium text-center">
          BULK INQUIRY
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 items-center w-full"
        >
          <div className="flex justify-between md:flex-col w-full md:gap-8">
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="firstName" className="home-form-label">
                First Name*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="First Name"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>{" "}
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="lastName" className="home-form-label">
                Last Name*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Last Name"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>

          <div className="flex justify-between md:flex-col w-full md:gap-8">
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="email" className="home-form-label">
                Email*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                error={!!errors.email}
                helperText={errors.email}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="phone" className="home-form-label">
                Phone*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Phone"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                error={!!errors.phone}
                helperText={errors.phone}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>

          <div className="flex justify-between md:flex-col w-full md:gap-8">
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="companyName" className="home-form-label">
                Company Name*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Company Name"
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                required
                error={!!errors.companyName}
                helperText={errors.companyName}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="companyGST" className="home-form-label">
                Company GST*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Company GST"
                id="companyGST"
                value={formData.companyGST}
                onChange={(e) =>
                  handleInputChange("companyGST", e.target.value)
                }
                required
                error={!!errors.companyGST}
                helperText={errors.companyGST}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>

          <div className="flex justify-between md:flex-col w-full md:gap-8">
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="productName" className="home-form-label">
                Product Name*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Product Name"
                id="productName"
                value={formData.productName}
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
                required
                error={!!errors.productName}
                helperText={errors.productName}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="custom-width-45 md:w-full">
              <InputLabel htmlFor="productQuantity" className="home-form-label">
                Product Quantity*
              </InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Product Quantity"
                id="productQuantity"
                value={formData.productQuantity}
                onChange={(e) =>
                  handleInputChange("productQuantity", e.target.value)
                }
                required
                error={!!errors.productQuantity}
                helperText={errors.productQuantity}
                className="bg-white rounded"
                style={{ border: "1px solid black" }}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-3">
            <InputLabel htmlFor="message" className="home-form-label">
              Message
            </InputLabel>
            <TextareaAutosize
              fullWidth
              minRows={4}
              variant="outlined"
              placeholder="Message"
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="p-3 rounded text-black"
              style={{ border: "1px solid black" }}
            />
          </div>
          <button
            type="submit"
            className="button-outlined bg-white text-lg w-fit px-8 py-2"
            style={{ border: "1px solid black" }}
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
};

export default Inquiry;
