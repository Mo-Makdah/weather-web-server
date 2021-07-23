const request = require("postman-request");

const geocode = (address, callback) => {
    const encodedURL = encodeURIComponent(address);
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodedURL +
        ".json?access_token=pk.eyJ1IjoibW8tbWFrZGFoIiwiYSI6ImNrcjQzNHFhdTB4OTEydnB0Y2lxdTVxcDcifQ.ymEYPORS4RPCQyozLYtqeg";

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find location, try another search", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
            });
        }
    });
};

module.exports = geocode;
