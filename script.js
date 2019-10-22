//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", express.static("CSS"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


// making external http request - https://www.npmjs.com/package/request#requestoptions-callback

app.post("/", function(req, res) {

      var crypto = req.body.crypto;
      var currency = req.body.fiat;
      var amount = req.body.amount;
      var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";


var options ={
  url: baseUrl,
  method: "GET",
  qs: {
    from: crypto,
    to: currency,
    amount: amount
  }
}
      request(options, function(error, response, body) {
          var data = JSON.parse(body);
          var price = data.price;
console.log(price);
          var currentDate = data.time;
          res.write("<p> Today's date " + currentDate + " </p>");
            res.write("<h1> " + amount + " of " + crypto + " is worth " + currency + " : " + price + "</h1>");
            res.send();
          });
      });

    app.listen(port, function() {
      console.log("Server is running on port " + port);

    });
