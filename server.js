// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;




// Setup Server
const server = app.listen(port, listening);
function listening() {
    //console.log(server);
    console.log(`localhost : ${port}`);

}


//Route handlers
app.post('/addWeather', addWeather);
function addWeather(req, res) {
    let data = req.body;
    projectData.push(data);
    console.log("Server side Post was called")
    //console.log(projectData);
    res.send('handled response')
}


app.get('/recentEntry', getRecentEntry)
function getRecentEntry(req, res) {
    res.send(projectData[projectData.length-1])
}