# Wats 4000 Final - The Woofing Wanderer

> A travel information webapp for travel information with your pooch.

This application provides the user a chance to select a "canine companion", which is an image of a dog that is sorted by breed.  The images links are retrieved through an API call to The Dog API (https://dog.ceo/dog-api/), which provides links to open source dog images.  The user is then routed to a page that collects some user data, including name, email, travel budget, travel data, and travel city.  

The travel city input is used to call noth the OpenWeatherMAP API to seach current weather data for that city, and to Google Maps API to provide a map with all of the cities matching the OpenWeatherMAP results.  For example, if the user searches "Spokane", OpenWeatherMAP will return 5 different Spokanes.  The user can then select the marker on the Google Map to clarify their location and retrieve current weather data.  This feature was added because OpenWeatherMAP is not clear when several cities of the same name are returned in the results, since only the city name, country, and lat/long coordinates are returned, which are not easy to read.  

The next page provides current and historical weather data for several popular travel destinations around the world (and Spokane, WA) on a Google GeoChart.  The chart can be customized by the user to display current weather (temp and wind speed), or historical weather data for any month (average high temp and precipitaion).  Each marker on the map can be selected to show historical weather data for the entire year, and provides a custom message based on the user's travel date inputted previously.  The final page is a secret surprise than can only be reached by selecting a destination.


## Build Setup for Project

``` bash
# install dependencies
npm install
npm i vue-google-charts
npm install vue2-google-maps

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
