// HTML elements variables
const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const message = document.querySelector("#message");
let error = document.querySelector("#error");

// search button submit event listener
weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = searchInput.value;
    message.textContent = "loading";
    error.textContent = "";

    fetch("/weather?address=" + location).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    message.textContent = "";
                    error.textContent = data.error;
                } else {
                    message.textContent = "It is currently " +
                    data.forecast.weatherDescription +
                    " in " +
                    data.forecast.location +
                    ", with a temperature of " +
                    data.forecast.temperature +
                    " degrees, but it feels like " +
                    data.forecast.feelsLike +
                    " degrees.";
                    error.textContent = "";
                    console.log(data)
                }
            });
        }
    );
});
