const Cas = require("../models/cas");
var ip = require("ip");
require('dotenv').config();
var Web3 = require('web3');


exports.createCas = (req, res, next) => {
    const url = req.protocol + "://" + ip.address()+":3000";
    const cas = new Cas({
        localisation: req.body.Localisation,
        description: req.body.Description,
        image: url + "/images/" + req.file.filename,
        created_at: Date.now()
    });
    cas
        .save()
        .then(createdCas => {
            res.status(201).json({
                message: "Cas added successfully",
                cas: {
                    ...createdCas,
                    id: createdCas._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a cas failed!"
            });
        });
};
exports.getListeCas = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const casQuery = Cas.find();
    let fetchedListeCas;
    if (pageSize && currentPage) {
        casQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    casQuery
        .then(documents => {
            fetchedListeCas = documents;
            return Cas.count();
        })
        .then(count => {
            res.status(200).json(
                //message: "Cas fetched successfully!",
                fetchedListeCas
                //maxCas: count
            );
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching list  Cas failed!"
            });
        });
};
/*
exports.getImageCas = (req, res, next) => {

    Cas.findById(req.params.id)
        .then(cas => {
            if (!cas) {
                return res.status(401).json({
                    message: "cas failed"
                });
            }
            else{
                return  res.send({'success':true,'message':cas.image});
            }
        });
};*/


exports.getCas = (req, res, next) => {
    Cas.findById(req.params.id)
        .then(cas => {
            if (!cas) {
                return res.status(401).json({
                    message: "cas not found "
                });
            }
            else{

                return res.status(201).json([
                        cas
                    ],

                );
            }
        });
};

exports.payCas = (req, res, next) => {
    const execSync = require('child_process').execSync;
    const stdout = execSync('cd C:\\Users\\chams\\Desktop\\PIM\\GiveBitProject2'
        +' &&truffle migrate');
    //const stdout = execSync('truffle test');
    console.log(`stdout: ${stdout}`);
    res.status(201).json({
        message: "transaction successed",
        success: true
    });


};
