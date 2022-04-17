const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const notecardRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
notecardRoutes.route("/:owner/:title/notecard").get(function (req, res) {
    let db_connect = dbo.getDb("notecardApp");
    let myquery = { owner: String(req.params.owner), title: String(req.params.title)};
    db_connect
      .collection("notecards")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  module.exports = notecardRoutes;