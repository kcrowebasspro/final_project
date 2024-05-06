// Import the required modules
const express = require("express")
const fetch = require("node-fetch") // Import the fetch function

// Port # for Express Server
const PORT = 8000

const app = express()

// Allow us to load environment variables from .env file
require("dotenv").config()

const request = require("request");
const { response } = require("express")


// API URL
const api_base = "https://api.weather.gov/";

app.get('/hello', async (request, response) => {
  console.log("Hello to You! API route has been called")

  response.send({message: "Hello to You"})
  
})

app.get('/alerts', async (request, response) => {
  console.error("/alerts is an invalid location")
  response.send("/alerts is an invalid location")
  
})

// Express Route to get NWS weather alerts for a location
app.get('/alerts?point=:point_coords', async (request, response) => {

  scriptName = "server.js: /alerts?point=:point_coords(): "
  console.log("in " + scriptName + " ...")
  try {

        var my_point = request.params.point_coords
        console.log(scriptName + " point_coords: " + my_point)

        // Check if coordinates are being passed in
        console.log(scriptName + "  coords: " + my_point.length)

        // If coordinates are not provided, pass in a value
        if (my_point.length < 1) {
           my_lat = process.env.defaultLat
           my_lon = process.env.defaultLon
           my_point = my_lat + "," + my_lon
            console.log("Missing coordinates. Default set to: " + my_point)
        }

        // Alerts
        const api_url = 'https://api.weather.gov/alerts?point=' + my_point

        console.log("*alerts for location: " + api_url)

        const fetch_response = await fetch (api_url);
        const json = await fetch_response.json();

        console.log(json)

        // Read the response stream and produce and return a JavaScript object
        response.json(json);

        console.log(" +++++++++ calling runQueries() +++++++++++++++")
          
        // Call runQueries
        //runQueries(json)

        console.log(" +++++++++ completed runQueries() +++++++++++++++")

        console.log(`${scriptName} ++++++++++++ done with getting alerts: ++++++++++++++` + my_point)
        }
  catch (error) {
    console.error(scriptName + " Error getting alerts for location: " + error.stack)
  }

}); //end alerts

// Start the server and listen on the specified port #
app.listen(PORT, '0.0.0.0', function(error) {

  if (error) {
    console.error("Error while starting server" + error.stack)
  }
  else {
    console.log("Node Server is Listening on PORT: " + PORT)
  }
})