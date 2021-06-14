const express = require("express");

const UserController = require("../controllers/user");

const extractFile = require("../middleware/file");

const router = express.Router();

router.post("/Signup", extractFile, UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/getUser/:id", UserController.getUser);

//router.get("/getImageUser/:id", UserController.getImageUser);


router.get("/lougoutUser", UserController.lougoutUser);




/*
router.put("/updateUser", UserController.UpdateUser);
*/
module.exports = router;
