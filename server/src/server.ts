import { env } from "./config/env";
import { app } from "./app";
import { mq } from "./services/rabbitmq.service";
import { registerSubscribers } from "./controller/subscriber.controller";
import { redKey } from "./services/redisKey.service";

const port = env.server.port;

try {
  app.listen(port, () => console.log(`Server running on ${port}`));

  registerSubscribers();

  redKey.setSchool("1234",{message: "anindya"})
} catch (err) {
  console.error("Startup error:", err);
  process.exit(1);
}
