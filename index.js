const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
//The request module can be used to simplify HTTP requests

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  // console.log(req.body.crypto);
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  request(
    `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto + fiat}`,
    function(error, response, body) {
      let info = JSON.parse(body);
      res.send(`<p>The price of ${crypto} is ${info.last + " " + fiat}</p>`);
      console.log(info.last);
    }
  );
});

// Start Server
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
