require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const session = require('./config/session.config');

session(app);

const projectName = "Random Legends";

app.locals.appTitle = `${projectName}`;

app.use((req, res, next) => {
    if (req.session.user) {
        app.locals.id = req.session.user._id;
        app.locals.username = req.session.user.username
        app.locals.summoner = req.session.user.summonerName
        app.locals.isAdmin = req.session.user.role === 'CHALLENGER'
    } else {
        app.locals.id = null;
        app.locals.username = null
        app.locals.summoner = null
        app.locals.isAdmin = null
    }
    next();
})

require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
