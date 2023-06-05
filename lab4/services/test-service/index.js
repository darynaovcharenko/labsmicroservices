const axios = require('axios');
const express = require('express');
require('dotenv').config()
const app = express();
var cors = require('cors')
app.use(express.json());


async function sendRequests(url, numRequests) {
    const startTime = new Date().getTime();
    let response = []
    for (let i = 0; i < numRequests; i++) {
        try {
            let get = await axios.get(url);
            console.log(`Request ${i + 1} completed`);
            console.log(get)
            response.push('made connection:' + JSON.stringify(get.status))
        } catch (error) {
            console.log(`Request ${i + 1} failed: ${error.message}`);
            response.push('connection failed' + error)
        }
    }
    const endTime = new Date().getTime();

    const averageResponseTime = (endTime-startTime)/numRequests;
    console.log(`Average response time: ${averageResponseTime} ms`);
    return [averageResponseTime, response]
}

const url = process.env.URL; 
const numRequests = process.env.NUM_REQUESTS;

app.use(cors());

// Endpoint for a slow test
app.get('/test/slow-test', (req, res) => {
    sendRequests(url, numRequests)
        .then((data) => {
            console.log(data)
            res.json({"avarage time:" :data[0], "number of requests:" : numRequests, "response": data[1]})
        })
        .catch((error) => console.error('Error:', error));
})
// Endpoint for breaking a pod
app.get('/test/break-pod', (req, res) => {
    sendRequests(url, numRequests)
        .then((data) => {
            console.log(data)
            res.json({"avarage time:" :data, "number of requests:" : numRequests})
        })
        .catch((error) => console.error('Error:', error));
})
//  listen on port 8081
let server = app.listen(8081, () => {
    console.log('Server listening on port 8081');
});
