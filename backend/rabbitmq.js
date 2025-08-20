const amqp = require('amqplib');

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqp.connect('amqp://admin:admin@rabbitmq:5672');
    channel = await connection.createChannel();
    await channel.assertQueue('booking_confirmations');
    console.log("✅ Connected to RabbitMQ");
  } catch (err) {
    console.error("RabbitMQ connection error:", err);
  }
}

function sendToQueue(data) {
  channel.sendToQueue('booking_confirmations', Buffer.from(JSON.stringify(data)));
}

module.exports = { connectQueue, sendToQueue };
