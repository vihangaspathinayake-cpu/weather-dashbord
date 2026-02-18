const express = require("express");
const cors = require("cors");
const weatherRoute = require("./weather");

const app = express();
app.use(cors());
app.use(express.static('../'));

app.use("/api", weatherRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Weather backend running on port " + PORT);
});
