
require('dotenv').config();
const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");


    //res.send("Server started and running") we should have only one res
})

app.post("/", function (req, res) {

    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp
            const weatherdes = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon

            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p> The Weather is currently " + weatherdes + "</p>");

            res.write("<h1> The Temp in " + query +" is " + temp + " Degree Celsius </h1>");

            res.write("<img src=" + imageUrl + ">")

            res.send();

        })
    })
    // console.log( "working Fine");
})




app.listen(3000, function () {
    console.log("Server started on portal 3000");
})


// https.get("",function(respone){
//     console.log(respone.statusCode);

//     respone.on("data",function(data){
//         var d =JSON.parse(data)
//         console.log((d));
//     })
// })