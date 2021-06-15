import "dotenv-safe/config";
import { SMTPServer } from "smtp-server";

const { SMTP_HOST, SMTP_PORT } = process.env;

const server = new SMTPServer({
  logger: true,
  banner: "Welcome to share docs SMTP Server",
  // disable STARTTLS to allow authentication in clear text mode
  disabledCommands: ["STARTTLS"],
  // Accept messages up to 10 MB. This is a soft limit
  size: 10 * 1024 * 1024,

  // Setup authentication
  // Allow all usernames and passwords, no account checking
  onAuth(auth, _session, callback) {
    return callback(null, { user: { username: auth.username } });
  },

  // Handle message stream
  onData(stream, session, callback) {
    console.log("Streaming message from user %s", (session.user as any)?.username);
    stream.pipe(process.stdout);
    stream.on("end", () => {
      console.log(""); // ensure linebreak after the message
      // callback(null, `Message queued as ${Date.now()}`); // accept the message once the stream is ended
      callback(null); // accept the message once the stream is ended
    });
  }
});

server.on("error", err => {
  console.log("Error occurred");
  console.log(err);
});

// start listening
if (SMTP_PORT && SMTP_HOST) {
  server.listen(Number(SMTP_PORT), SMTP_HOST);
}
