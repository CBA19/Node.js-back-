const Event = require("../models/event");
var ip = require("ip");
const jwt = require("jsonwebtoken");


exports.createEvent = (req, res, next) => {
    const url = req.protocol + "://" + ip.address()+":3000";
    const event = new Event({
        lieu: req.body.Lieu,
        description: req.body.Description,
        image: url + "/images/" + req.file.filename,
        date_event: req.body.Date_event,
        titre:req.body.Titre,
        participe:0,
        interesse:0,
        userId:req.userData.userId
    });
    event
        .save()
        .then(createdEvent => {
            res.status(201).json({
                message: "Event added successfully",
                event: {
                    ...createdEvent,
                    id: createdEvent._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating an event failed!" +error,

            });
            console.log(error);
        });
};
exports.getListeEvents = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const eventQuery = Event.find();
    let fetchedListeEvents;
    if (pageSize && currentPage) {
        eventQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    eventQuery
        .then(documents => {
            fetchedListeEvents = documents;
            return Event.count();
        })
        .then(count => {
            res.status(200).json(
                //message: "Cas fetched successfully!",
                fetchedListeEvents
                //maxCas: count
            );
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching list  events failed!"
            });
        });
};
exports.getEvent = (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return res.status(401).json({
                    message: "event not found "
                });
            }
            else{
                return res.status(201).json([
                        event
                    ]

                );
            }
        });
};



exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({ _id: req.params.id})
        .then(result => {
            console.log(result);
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting event failed!"
            });
        });
};



exports.interesse = (req, res, next) => {

    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return res.status(401).json({
                    message: "event not found "
                });
            }
            else{
                event.interesse=(event.interesse)+1;
                event.save();
                return res.status(201).json([
                    event
                ]);
            }
        });
};



exports.participe = (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return res.status(401).json({
                    message: "event not found "
                });
            }
            else{
          event.participe=(event.participe)+1;
          event.save();
                return res.status(201).json([
                    event
                ]);
            }
        });
};