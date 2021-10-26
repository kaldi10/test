const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getDockerHost = require("get-docker-host");
const isInDocker = require("is-in-docker");
const config = require("./config");

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// GET FROM THE SERVER
app.get("/all", (request, response) => {
    response.status(200); // 200 is OK
    response.send(`test get request /all == ok`);
  console.log("get request all: ok", request.body);
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
