const express = require("express");
const router = express.Router();
const {
  register,
  login,
  GetAllProductNames,
  postForm,
  MyAccount,
} = require("../Controller/User");
const requireAuth = require("../middleware/User");

router.route("/user/register").post(register);
router.route("/user/login").post(login);
router.route("/user/get-all-coursenames").get(GetAllProductNames);
router.route("/user/form").post(postForm);
router.route("/user/account/:email").get(requireAuth,MyAccount);

module.exports = router;
