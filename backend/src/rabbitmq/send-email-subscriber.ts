require("dotenv").config();
import amqplib, { Channel, Connection } from "amqplib/callback_api";
import nodemailer from "nodemailer";
import { SEND_EMAIL_QUEUE } from "../constants/rabbitmq";

const { AMQP_HOST, AMQP_USER, AMQP_PASSWORD, AMQP_PORT } = process.env;

const main = async () => {
  console.log(`start`);
  // TODO
  // Setup Nodemailer transport using the default SMTP transport
  const transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      // TODO
      user: "",
      pass: ""
    }
  });

  amqplib.connect(
    `amqp://${AMQP_USER}:${AMQP_PASSWORD}@${AMQP_HOST}:${AMQP_PORT}`,
    (err: Error, connection: Connection) => {
      if (err) throw err;

      console.log(`connected`);

      connection.createChannel((err: Error, channel: Channel) => {
        if (err) throw err;
        channel.assertQueue(SEND_EMAIL_QUEUE, { durable: true }, (err: Error) => {
          if (err) throw err;
          channel.prefetch(1);
          channel.consume(SEND_EMAIL_QUEUE, data => {
            if (data === null) return;

            // Decode message contents
            let message = JSON.parse(data.content.toString());

            // attach message specific authentication options
            // this is needed if you want to send different messages from
            // different user accounts
            // TODO
            message.auth = {
              user: "testuser",
              pass: "testpass"
            };

            // Send the message using the previously set up Nodemailer transport
            console.log(`send email`);
            transporter.sendMail(message, (err, info) => {
              if (err) {
                console.error(err.stack);
                // put the failed message item back to queue
                return channel.nack(data);
              }

              console.log("Delivered message %s", info.messageId);
              // remove message item from the queue
              channel.ack(data);
            });
          });
        });
      });
    }
  );
};

main().catch(err => {
  throw err;
});
