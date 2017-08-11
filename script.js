var initializeLoc = () => {
	$.ajax({
		type: "GET",
		url: "https://ipinfo.io/json/",
		success: getLocation
	});
};

function getLocation(res) {
	var city = res.city;
	var region = res.region;
	var country = res.country;
	var latLong = res.loc;
	setLocation(city, region, country, latLong);
	darkSkyCall(latLong);
}

initializeLoc();

var setLocation = (city, region, country, latLong) => (
	$("#city").text(city),
	$("#region").text(region),
	$("#country").text(country)
);

var darkSkyCall = (latLong) => {
	$.ajax({
		type: "GET",
		url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0fdfd2ed2a6de37b0d1a65e866c91b76/${latLong}`,
		datatype: "jsonp",
		crossDomain: true,
		success: getWeather
	});
};

// var setIcon = (icon, sunriseTime, sunsetTime, currentTime) => {
// 	var iconType = "";
// 	if (currentTime > sunriseTime && currentTime < sunsetTime){
// 		iconType = "day";
// 		if (iconType === "day" && icon === "clear"){
// 			iconClass = `wi-${iconType}-sunny`;
// 		}
// 	} else {
// 		iconType = "night";
// 	}
// 	var iconClass = `wi-${iconType}-${icon}`;

// 	$("#weather-icon").attr("class", `wi ${iconClass}`);
// };

var setIcon = (icon) => {
	var skycons = new Skycons({"color": "white"});
	skycons.add("icon1", icon);
	skycons.play();
};

var getWeather = (res) => {
	var summary = res.currently.summary;
	var hourlySummary = res.hourly.summary;
	var icon = res.currently.icon;
	var temperatureF = Math.round(res.currently.temperature);
	var apparentTemperatureF = Math.round(res.currently.apparentTemperature);
	
	setWeather(summary, hourlySummary, temperatureF, apparentTemperatureF);
	setIcon(icon);
};

var setWeather = (summary, hourlySummary, temperatureF, apparentTemperatureF) => {
	var celciusConv = (fTemp) => (fTemp - 32) * 0.5556;

	var temperatureC = Math.round(celciusConv(temperatureF));
	var apparentTemperatureC = Math.round(celciusConv(apparentTemperatureF));
	$("#real-temp").text(temperatureF);
	$("#feels-temp").text(apparentTemperatureF);
	$("#weather-type").text(summary);
	$("#weather-summ").text(hourlySummary);
	
	// Celcius => Farenheight switch
	var celcius = false;
	$("#cToF").on("click", () => {
		if (celcius == false) {
			$("#real-temp").text(temperatureC);
			$("#feels-temp").text(apparentTemperatureC);
			celcius = true;
		} else if (celcius == true) {
			$("#real-temp").text(temperatureF);
			$("#feels-temp").text(apparentTemperatureF);
			celcius = false;
		}
	});
};

