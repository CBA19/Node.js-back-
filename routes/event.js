const express = require("express");

const EventController = require("../controllers/event");

const extractFile = require("../middleware/file");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/CreatEvent",checkAuth,extractFile, EventController.createEvent);

router.get("/ListeEvents", EventController.getListeEvents);


router.get("/getEvent/:id", EventController.getEvent);


router.delete("/deleteEvent/:id", EventController.deleteEvent);


router.put("/interesse/:id",  EventController.interesse);

router.put("/participe/:id", EventController.participe);


module.exports = router;
