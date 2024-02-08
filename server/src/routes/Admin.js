const express = require("express");
const router = express.Router();
const {
  GetFormData,
  CreateProduct,
  EditProduct,
  DeleteProduct,
  GetAllProducts,
} = require("../Controller/Admin");
const requireAuth = require("../middleware/Admin");

router.route("/admin/create-product").post(requireAuth,CreateProduct);
router.route("/admin/get-all-products").get(requireAuth,GetAllProducts);
router.route("/admin/edit-product/:productId").put(requireAuth,EditProduct);
router.route("/admin/delete-product/:productId").delete(requireAuth,DeleteProduct);
router.route("/admin/get-formdata").get(requireAuth,GetFormData);

module.exports = router;
