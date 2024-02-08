import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/User";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DeleteIcon from "@mui/icons-material/Delete";
import StoreIcon from '@mui/icons-material/Store';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const logoutf = async () => {
    try {
      dispatch(logout());
      localStorage.clear();
      console.log("cleared");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <ListItemButton
      onClick={logoutf}
      className="mt-10 border-2 border-solid border-black bg-black"
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
};
export const mainListItems = (
  <React.Fragment>
    <Link to="/admin/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/admin/products">
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </Link>
    <Link to="/admin/sales">
      <ListItemButton>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Sales" />
      </ListItemButton>
    </Link>
    <Link to="/admin/form">
      <ListItemButton>
        <ListItemIcon>
          <ContactMailIcon />
        </ListItemIcon>
        <ListItemText primary="Form" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
