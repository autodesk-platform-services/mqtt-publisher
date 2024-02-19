let { PORT,MQTT_URL,MQTT_CLIENT,MQTT_USERNAME,MQTT_PASSWORD } = process.env;
if (!MQTT_USERNAME || !MQTT_PASSWORD) {
    console.warn('Missing some of the environment variables.');
    process.exit(1);
}
PORT = PORT || 3002;

module.exports = {
    PORT,
    MQTT_URL,
    MQTT_CLIENT,
    MQTT_USERNAME,
    MQTT_PASSWORD
};
