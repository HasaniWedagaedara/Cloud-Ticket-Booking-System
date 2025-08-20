const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
require('dotenv').config();

// Connect to DB (to fetch user email)
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'postgres',
  database: process.env.DB_NAME || 'ticketdb',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432
});

// Fake email sender for demo
async function sendEmail(to, subject, text) {
  console.log(`📧 Sending email to ${to}: ${subject} - ${text}`);
  // In real setup: configure Nodemailer SMTP
}

async function startWorker() {
  try {
    const connection = await amqp.connect('amqp://admin:admin@rabbitmq:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('booking_confirmations');
    console.log("👷 Worker is listening for messages...");

    channel.consume('booking_confirmations', async (msg) => {
      const booking = JSON.parse(msg.content.toString());
      console.log("📨 Received booking:", booking);

      // Get user email from DB
      const result = await pool.query('SELECT email FROM users WHERE id = $1', [booking.user_id]);
      if (result.rows.length > 0) {
        const userEmail = result.rows[0].email;
        await sendEmail(userEmail, "Booking Confirmation", `Your booking for event ${booking.event_id} is confirmed!`);
      }

      channel.ack(msg);
    });
  } catch (err) {
    console.error("Worker error:", err);
  }
}

startWorker();
