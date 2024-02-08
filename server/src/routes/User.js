const express = require("express");
const router = express.Router();
const {
  register,
  login,
  postForm,
  MyAccount,
  UpdateAccount,
  GetAllProducts,
} = require("../Controller/User");
const requireAuth = require("../middleware/User");

router.route("/user/register").post(register);
router.route("/user/login").post(login);
router.route("/user/get-all-products").get(GetAllProducts);
router.route("/user/form").post(postForm);
router.route("/user/account/:email").get(requireAuth,MyAccount);
router.route("/user/account/:email").put(requireAuth,UpdateAccount);

module.exports = router;
