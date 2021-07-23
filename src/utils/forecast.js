const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=ece2e0a86d51298135f9b9817bbeb1e8&query=" +
        latitude +
        "," +
        longitude;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body.error) {
            callback("Unable to find location!", undefined);
        } else {
            callback(undefined, {
                location: response.body.location.name,
                temperature: response.body.current.temperature,
                weatherDescription: response.body.current.weather_descriptions,
                feelsLike: response.body.current.feelslike,
            });
        }
    });
};

module.exports = forecast;
