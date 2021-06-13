const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  console.log(event);

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
