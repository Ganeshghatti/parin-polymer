import React, { useState, useEffect } from "react";
import axios from "axios";
import Panel from "../Panel/Panel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import "./Products.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Select, MenuItem } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinnerf from "../../../Components/Spinnerf";
import imgplaceholder from "./imgplaceholder.png";
import plus from "./plus.jpg";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  zIndex:"99",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
  padding: "16px",
  overflow: "auto",
  height: "100vh",
  width: "90vw",
  "@media (min-width: 868px)": {
    width: "75vw",
  },
};

export default function Products() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editopen, seteditOpen] = useState(false);
  const handleeditOpen = () => seteditOpen(true);
  const handleeditClose = () => seteditOpen(false);
  const navigate = useNavigate();

  const admin = useSelector((state) => state.user.user);
  const [allproducts, setallproducts] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    amountInINR: 0,
    quantityAvailable: 0,
    dimension: "",
    specifications: [],
    specificationsInput: "",
    productId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(admin);
        if (admin.isAdmin) {
          setLoading(true);
          const response = await axios.get(
            `https://parin-polymer-server.vercel.app/admin/get-all-products`,
            {
              headers: {
                Authorization: `Bearer ${admin.token}`,
              },
            }
          );
          console.log(response.data.products);
          setallproducts(response.data.products);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setLoading(false);
          return navigate(`/login`);
        }
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

    fetchData();
  }, [admin]);

  const handlespecificationsAdd = (e) => {
    e.preventDefault();

    if (formData.specificationsInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        specifications: [
          ...prevData.specifications,
          prevData.specificationsInput,
        ],
        specificationsInput: "",
      }));
    }
  };

  const handlespecificationsDelete = (specificationsToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      specifications: prevData.specifications.filter(
        (req) => req !== specificationsToDelete
      ),
    }));
  };

  const clickedEditf = async (item) => {
    console.log(item.productId);
    setFormData({
      ...formData,
      productName: item.productName,
      productId: item.productId,
      productDescription: item.productDescription,
      amountInINR: item.amountInINR,
      quantityAvailable: item.quantityAvailable,
      dimension: item.dimension,
      specifications: item.specifications,
      specificationsInput: "",
    });
    handleeditOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("create new product");
      const response = await axios.post(
        "https://parin-polymer-server.vercel.app/admin/create-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      console.log(response);
      handleClose();
      window.location.reload();
      setAlert(
        <Alert
          style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
          variant="filled"
          severity="success"
        >
          <p>Product Created Successfully</p>
        </Alert>
      );
      setTimeout(() => setAlert(null), 5000);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoading(false);
        return navigate(`/`);
      }
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

  const handleeditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.productId);
      setLoading(true);
      const response = await axios.put(
        `https://parin-polymer-server.vercel.app/admin/edit-product/${formData.productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      console.log(response);
      setAlert(
        <Alert
          style={{
            position: "fixed",
            bottom: "3%",
            left: "2%",
            zIndex: 999,
          }}
          variant="filled"
          severity="success"
        >
          Product details updated successfully!
        </Alert>
      );
      setTimeout(() => setAlert(null), 5000);
      setLoading(false);
      window.location.reload();

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoading(false);
        return navigate(`/`);
      }
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

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      try {
        setLoading(true);
        await axios.delete(
          `https://parin-polymer-server.vercel.app/admin/delete-product/${formData.productId}`,
          {
            headers: {
              Authorization: `Bearer ${admin.token}`,
            },
          }
        );
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="success"
          >
            <p>Product deleted successfully</p>
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setLoading(false);
        window.location.reload();

      } catch (error) {
        if (error.response && error.response.status === 401) {
          setLoading(false);
          return navigate(`/`);
        }
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
    }
  };
  return (
    <div className="AdminProducts flex">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-4xl font-semibold poppins text-center my-6">
            Create New Product!
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-8"
          >
            <TextField
              label="Product Name"
              type="text"
              className="w-full"
              value={formData.productName}
              required
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  productName: e.target.value,
                }))
              }
            />
            <TextField
              label="Product Dimension"
              type="text"
              className="w-full"
              value={formData.dimension}
              required
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  dimension: e.target.value,
                }))
              }
            />
            <TextField
              label="Product Amount in INR"
              className="w-full"
              type="number"
              value={formData.amountInINR}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  amountInINR: parseInt(e.target.value),
                }))
              }
            />
            <TextField
              label="Available Quantity"
              className="w-full"
              type="number"
              value={formData.quantityAvailable}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  quantityAvailable: parseInt(e.target.value),
                }))
              }
            />
            <TextareaAutosize
              className="w-full border-2 border-solid border-gray2 border-opacity-50 rounded p-2"
              aria-label="minimum height"
              minRows={3}
              placeholder="Fill Product Description"
              value={formData.productDescription}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  productDescription: e.target.value,
                }))
              }
            />

            <div className="flex flex-col w-full">
              <p className="text-sm font-normal poppins text-gray">
                To fit best in design, add 4-7 points, each point consisting
                around 15-20 words
              </p>
              <label className="flex w-full justify-between gap-3">
                <TextField
                  type="text"
                  placeholder="Technical Specifications"
                  className="w-3/4"
                  value={formData.specificationsInput}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      specificationsInput: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={handlespecificationsAdd}
                  className="w-1/4 button-filled"
                >
                  Add
                </button>
              </label>
              <div className="flex gap-4">
                {formData.specifications.map((req) => (
                  <div key={req}>
                    {req}
                    <CancelIcon
                      onClick={() => handlespecificationsDelete(req)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full button-filled py-3">Create New!</button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={editopen}
        onClose={handleeditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-4xl font-semibold poppins text-center my-6">
            Edit Product!
          </h1>
          <form
            onSubmit={handleeditSubmit}
            className="flex flex-col items-center gap-8"
          >
            <TextField
              label="Product Name"
              type="text"
              className="w-full"
              value={formData.productName}
              required
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  productName: e.target.value,
                }))
              }
            />
            <TextField
              label="Product Dimension"
              type="text"
              className="w-full"
              value={formData.dimension}
              required
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  dimension: e.target.value,
                }))
              }
            />
            <TextField
              label="Product Amount in INR"
              className="w-full"
              type="number"
              value={formData.amountInINR}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  amountInINR: parseInt(e.target.value),
                }))
              }
            />
            <TextField
              label="Available Quantity"
              className="w-full"
              type="number"
              value={formData.quantityAvailable}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  quantityAvailable: parseInt(e.target.value),
                }))
              }
            />
            <TextareaAutosize
              className="w-full border-2 border-solid border-gray2 border-opacity-50 rounded p-2"
              aria-label="minimum height"
              minRows={3}
              placeholder="Fill Product Description"
              value={formData.productDescription}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  productDescription: e.target.value,
                }))
              }
            />

            <div className="flex flex-col w-full">
              <p className="text-sm font-normal poppins text-gray">
                To fit best in design, add 4-7 points, each point consisting
                around 15-20 words
              </p>
              <label className="flex w-full justify-between gap-3">
                <TextField
                  type="text"
                  placeholder="Technical Specifications"
                  className="w-3/4"
                  value={formData.specificationsInput}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      specificationsInput: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={handlespecificationsAdd}
                  className="w-1/4 button-filled"
                >
                  Add
                </button>
              </label>
              <div className="flex gap-4">
                {formData.specifications.map((req) => (
                  <div key={req}>
                    {req}
                    <CancelIcon
                      onClick={() => handlespecificationsDelete(req)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full button-filled py-3"
              onClick={handleeditSubmit}
            >
              Save edit
            </button>

            <button
              onClick={handleDelete}
              className="w-full text-white py-3 rounded-xl"
              style={{ backgroundColor: "red" }}
            >
              Delete
            </button>
          </form>
        </Box>
      </Modal>
      <Panel tab="Products" />
      <Stack spacing={2}>{alert}</Stack>
      {loading ? (
        <Spinnerf />
      ) : (
        <>
          {allproducts && (
            <div
              className="flex flex-wrap md:flex-col justify-center gap-8 w-3/4 h-full md:items-center"
              style={{ marginLeft: "1vw", marginTop: "10vh" }}
            >
              <div
                className="flex flex-col items-center justify-center cursor-pointer admin-products-card bg-[#F1F3F2] py-12"
                onClick={handleOpen}
              >
                <img
                  style={{ objectFit: "contain" }}
                  src={plus}
                  className="w-2/5"
                />
                <p className="font-bold text-2xl md:text-xl">
                  Create New Product
                </p>
              </div>
              {allproducts.map((item, index) => (
                <div
                  className="cursor-pointer relative admin-products-card gap-2 rounded-xl flex flex-col items-center pb-4"
                  key={item.productId}
                  onClick={() => clickedEditf(item)}
                >
                  <img src={imgplaceholder} className="w-full object-contain" />
                  <div className="flex justify-between items-center w-11/12">
                    <p className="font-medium text-xl md:text-lg">
                      {item.productName}
                    </p>
                    <p className="font-semibold text-darkblue text-base md:text-sm">
                      {item.dimension}
                    </p>
                  </div>
                  <p className="font-medium text-base md:text-sm w-11/12">
                    <span className="text-darkblue font-bold text-lg">
                      {item.quantityAvailable}
                    </span>
                    In stock
                  </p>
                  <Chip
                    label={
                      <p className="text-sm p-1 flex justify-center items-center">
                        <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                        {item.amountInINR}
                      </p>
                    }
                    variant="filled"
                    style={{
                      backgroundColor: "#EDF8FF",
                    }}
                    className="absolute top-3 right-3 z-50"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
