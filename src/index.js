import 'dotenv/config'; //using safe variables
import cors from 'cors'; //importing cors

var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

var FAVORITES_COLLECTION = "favorites";

var app = express();
app.use(bodyParser.json());
app.use(cors()); //using cors, getting data from other domains

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URL, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/favorites"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/favorites", function(req, res) {
  db.collection(FAVORITES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get favorites list.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/favorites", function(req, res) {
  var newFavorite = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(FAVORITES_COLLECTION).insertOne(newFavorite, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create a new favorite.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/favorites/:name", function(req, res) {
  db.collection(FAVORITES_COLLECTION).findOne({ name: req.params.name }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get favorite");
    }
      if(doc === null) {
        res.status(404).send(null);
      }
      else { res.status(200).send(true);}
  });
});


app.delete("/api/favorites/:name", function(req, res) {
  db.collection(FAVORITES_COLLECTION).deleteOne({name: req.params.name}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete favorite");
    } else {
      res.status(200).json(req.params.name);
    }
  });
});