const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getDockerHost = require("get-docker-host");
const isInDocker = require("is-in-docker");
const config = require("./config");
const fetch = require("node-fetch");
const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//  "http://localhost:3000"
// process.env.API
// var corsOptions = {
//   origin: process.env.API,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors())
app.get("/api/test", async (req, res) => {
  var host = req.get("host");
  var origin = req.header("Origin");
  var userIP = req.socket.remoteAddress;
  var clientip = req.headers["x-forwarded-for"];
  console.log("host: req.get(host): ", host);
  console.log("origin: req.header(Origin): ", origin);
  console.log("userIP: req.socket.remoteAddress: ", userIP);
  console.log(
    "IP: req.connection.remoteAddress: ",
    req.connection.remoteAddress
  );
  console.log("clientip: req.headers[x-forwarded-for]: ", clientip);
  // if (req.header("Origin") == corsOptions.origin) {
  // http://api.service.local:8080/api/test
  const result = await (
    await fetch("http://api.service.local:8080/api/test")
  ).json();
  console.log(result); 
  res.json({ msg: "Success!!!!!" });
  //   console.log({ msg: "Success!!!!!" });
  // } else {
  //   res.json({ msg: "Not auth" });
  //   console.log({ msg: "not auth" });
  // }
});
app.listen(config.port, config.host);
console.log(`Running on http://${config.host}:${config.port}`);
checkDocker = () => {
  return new Promise((resolve, reject) => {
    if (isInDocker()) {
      getDockerHost((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    } else {
      resolve(null);
    }
  });
};

checkDocker()
  .then((addr) => {
    if (addr) {
      for (let index = 0; index < 10; index++) {
        console.log("Docker host is " + addr);
      }
      for (let index = 0; index < 5; index++) {
        console.log("*******************************************************");
      }
    } else {
      for (let index = 0; index < 1; index++) {
        console.log("Not in Docker");
      }
    }
  })
  .catch((error) => {
    for (let index = 0; index < 10; index++)
      console.log("Could not find Docker host: " + error);
  });
// var whitelist = ["http://localhost:3000", "http://example2.com"];
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   console.log("header origin in cors callback", req.header("Origin"));
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   console.log("corsOptions.origin: ", corsOptions.origin);
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
