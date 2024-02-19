const express = require('express');
const {MQTT_URL,MQTT_CLIENT,MQTT_USERNAME,MQTT_PASSWORD, PORT } = require('./config.js');
let app = express();
const server = require('http').createServer(app);
const mqtt = require("mqtt");

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

server.listen(PORT, function () { console.log(`Server listening on port ${PORT}...`); });


// connection option
const options = {
    clean: true, // retain session
connectTimeout: 4000, // Timeout period
// Authentication information
clientId: MQTT_CLIENT+Date.now(),
username: MQTT_USERNAME,
password: MQTT_PASSWORD,
}

const connectUrl = MQTT_URL
const client = mqtt.connect(connectUrl, options)

client.on('reconnect', (error) => {
console.log('reconnecting:', error)
})

client.on('connect', (e) => {
    sendData();
    setTimeout(()=>{
        sendData();
    },5000)
})

client.on('error', (error) => {
console.log('Connection failed:', error)
})


function sendData() {
    let data = {timestamps:[],temperature:[],flowrate:[],pressure:[]};
    data.timestamps.push(new Date);
    data.flowrate.push(random(20,240));
    data.pressure.push(random(0,200));
    data.temperature.push(random(0,100));
    client.publish('data', data)
}

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
