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
  let amount = req.body.amount;
  let url = `https://apiv2.bitcoinaverage.com/convert/global`;
  // `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto + fiat}`
  let options = {
    url,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount
    }
  };
  request(options, function(error, response, body) {
    let info = JSON.parse(body);
    res.write(`<p>The current date is ${info.time}</p>`);
    res.write(
      `<h3>The price of ${amount + " " + crypto} is ${info.price +
        " " +
        fiat}</h3>`
    );
    res.send();
  });
});

// Start Server
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
