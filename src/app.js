// importing npm modules
const path = require("path");
const express = require("express");
const hbs = require("hbs");

// importing local modules
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// initializing express server
const app = express();

// initializing paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting up express config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

// index page route
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
    });
});

// about page route
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
    });
});

// help page route
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
    });
});

// weather request route
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "address query not provided",
        });
    }

    geocode(
        req.query.address,
        (geocodeError, { latitude, longitude } = {}) => {
            if (geocodeError) {
                return res.send({
                    error: geocodeError,
                });
            }

            forecast(latitude, longitude, (forecastError, forecastData) => {
                if (forecastError) {
                    return res.send({
                        error: forecastError,
                    });
                }
                res.send({
                    forecast: forecastData
                });
            });
        }
    );

});

// help 404 page route
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help Article not found!",
    });
});

// 404 page route
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found!",
    });
});

// server running
app.listen(3000, () => {
    console.log("Server Connected!");
});
