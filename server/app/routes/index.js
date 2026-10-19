const express = require("express");
const router = express.Router();
const manufacturerRoutes = require("./manufacturerRoutes");
const carRoutes = require("./carRoutes");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} - Request made` });
});

router.use("/manufacturer", manufacturerRoutes);
router.use("/car", carRoutes);

module.exports = router;
