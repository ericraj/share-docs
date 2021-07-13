require("dotenv").config();
import amqplib, { Channel, Connection } from "amqplib/callback_api";
import { SEND_EMAIL_QUEUE } from "../constants/rabbitmq";
import { SendEmailPayload } from "../types";

const { AMQP_HOST, AMQP_USER, AMQP_PASSWORD, AMQP_PORT } = process.env;

const sender = (channel: Channel, payload: SendEmailPayload, sendNext: Function) => {
  const sent = channel.sendToQueue(SEND_EMAIL_QUEUE, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
    contentType: "application/json"
  });

  if (sent) {
    return sendNext();
  } else {
    channel.once("drain", () => sendNext());
  }
};

console.log(`AMQP_USER`, AMQP_USER);

const sendEmailPublisher = async (payload: SendEmailPayload) => {
  amqplib.connect(
    `amqp://${AMQP_USER}:${AMQP_PASSWORD}@${AMQP_HOST}:${AMQP_PORT}`,
    (err: Error, connection: Connection) => {
      if (err) throw err;

      connection.createChannel((err: Error, channel: Channel) => {
        if (err) throw err;

        channel.assertQueue(SEND_EMAIL_QUEUE, { durable: true }, err => {
          if (err) throw err;

          let sent = 0;
          const sendNextMessage = () => {
            // TODO ?
            if (sent >= 1) {
              console.log("All messages sent !");
              return channel.close(() => connection.close());
            }

            sent++;
            sender(channel, payload, sendNextMessage);
          };

          sendNextMessage();
        });
      });
    }
  );
};

export default sendEmailPublisher;
