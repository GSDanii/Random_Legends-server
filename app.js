require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);





const projectName = "Random Legends";

app.locals.appTitle = `${projectName}`;



require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
