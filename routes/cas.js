const express = require("express");

const CasController = require("../controllers/cas");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("/createCas", extractFile, CasController.createCas);

router.get("/ListeCas", CasController.getListeCas);

router.get("/getCas/:id", CasController.getCas);

router.get("/payCas", CasController.payCas);


module.exports = router;