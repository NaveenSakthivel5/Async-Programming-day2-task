
async function getCountries() {
    try {
        let res = await fetch("https://restcountries.com/v2/all");
        let country = await res.json();
        return country;
    } catch (error) {
        console.log(error);
    }
}

async function getWeather(latlng) {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=6e2c88c97ecef6db0231bb797c68809d`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function myCountries() {
    let data = await getCountries();

    let heading = document.createElement('h1');
    heading.textContent = 'Weather Information for Countries';
    document.body.appendChild(heading);

    let container = document.createElement('div');
    container.setAttribute('id', 'countriesContainer');
    document.body.appendChild(container);

    data.forEach((e) => {
        let card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";

        let cardTitle = document.createElement("h2");
        cardTitle.className = "card-title";
        cardTitle.textContent = e.name;

        let img = document.createElement("img");
        img.className = "card-img-top";
        img.src = e.flag;
        img.alt = "Flag";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let capital = document.createElement("h5");
        capital.textContent = "Capital: " + e.capital;

        let region = document.createElement("h5");
        region.textContent = "Region: " + e.region;

        let countryCode = document.createElement("h5");
        countryCode.textContent = "Country Code: " + e.callingCodes;

        let link = document.createElement("button");
        link.className = "btn btn-primary";
        link.textContent = "Click for Weather";

        link.addEventListener("click", async () => {
            const temperature = await getWeather(e.latlng);
            if (temperature !== null) {
                alert(`Temperature in ${e.name}: ${(temperature.main.temp - 273.15).toFixed(2)} °C
                      \nMinimum Temperature: ${(temperature.main.temp_min - 273.15).toFixed(2)} °C
                      \nMaximum Temperature: ${(temperature.main.temp_max - 273.15).toFixed(2)} °C
                      \nPressure: ${temperature.main.pressure}
                      \nHumidity: ${temperature.main.humidity}`
                      );
            } else {
                alert(`Unable to fetch weather for ${e.name}`);
            }
        });

        cardBody.appendChild(capital);
        cardBody.appendChild(region);
        cardBody.appendChild(countryCode);
        cardBody.appendChild(link);

        card.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardBody);

        container.appendChild(card);
    });
}

myCountries();
