const express =require("express");
const https =require("https");
const bodyParser = require("body-parser");
const app =express();

app.use(bodyParser.urlencoded({extended: true}));




app.get("/", function(req,res) {
res.sendFile(__dirname +"/index.html")
});

app.post("/", function (req,res) {
const query=req.body.CityName;
const apikey="203b4de288dd0440f822a57bf90dbb94"
const unit="metric"
const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
https.get(url,function(response){
console.log(response.statusCode);
response.on("data",function(data){
const weatherdata =JSON.parse(data)
const temp=weatherdata.main.temp
const weatherDescription =weatherdata.weather[0].description
const icon=weatherdata.weather[0].icon
const imageURL ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"

res.write("<h1>The temperature in "+query+" is "+temp+" degress Celcius</h1>");
res.write("<img src="+ imageURL + ">");
res.send()
});
});
})







app.listen(3000,function () {
  console.log("Server is running on port 3000");
})
