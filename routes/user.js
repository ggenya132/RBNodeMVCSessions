let userController = require("../controllers/user");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ user: "works" });
});

router.post("/", userController.createUser);

module.exports = router;
