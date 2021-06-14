const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require('dotenv').config();
const User = require("../models/user");
var bodyParser = require ('body-parser');
const express = require("express");
var session = require('express-session');



var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var ip = require("ip");


exports.createUser = (req, res, next) => {
  const url = req.protocol + "://" + ip.address()+":3000";
  bcrypt.hash(req.body.Password, 10).then(hash => {
    const user = new User({
      email: req.body.Email,
      password: hash,
      login: req.body.Login,
      image: url + "/images/" + req.file.filename,
      addresse: req.body.Addresse,
      role:req.body.Role,
        loggedIn:false
    });
      // Step 1 Mail
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL || 'chames.benalaya@gmail.com', // TODO: your gmail account
              pass: process.env.PASSWORD || 'chams20205203' // TODO: your gmail password
          },
          tls: {
              rejectUnauthorized: false
          }
      });
      // Step 2 Mail
      let mailOptions = {
          from: 'chames.benalaya@gmail.com', // TODO: email sender
          to: user.email, // TODO: email receiver
          subject: 'Nodemailer - Test',
          text: 'Wooohooo it works!!'
      };
      // Step 3 Mail
      transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
              return console.log('Error occurs',err);
          }
          return console.log('Email sent!!!');
      });
    user
      .save()
        .then(result => {
          const token = jwt.sign(
              { email: user.email, userId: user._id },
              "secret_this_should_be_longer",
              { expiresIn: "1h" }
          );
          res.status(201).json({
            message: "User created!",
            token: token,
            result: result
          });

        })
      .catch(err => {
        console.log(err);
        
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.Email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

        fetchedUser = user;
        fetchedUser.loggedIn=true;
        fetchedUser.save();
        req.session=fetchedUser;
      return bcrypt.compare(req.body.Password, user.password);

    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
          success:true,
          userId: fetchedUser._id,
          message:fetchedUser._id,
          loggedIn:true
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.getUser = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            else{
                return res.status(201).json([
                    user
                    ]

                );
            }
        });
};

exports.lougoutUser = (req, res, next) => {
    User.findOne({id: req.body._id})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "user not found"
                });
            } else {
                req.session = null;
                user.loggedIn = false;
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: "User loggedOut!",
                            success: true
                        });
                    });
            }


        });
}

