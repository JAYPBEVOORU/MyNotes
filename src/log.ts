import pino from "pino";

// const stream = pino.destination({
//   dest: `${__dirname}/../logs/app.log`,
// });
const stream = pino.transport({
  targets: [
    {
      level: "debug",
      target: "pino-pretty",
      options: {},
    },
    {
      level: "trace",
      target: "pino/file",
      options: { destination: `${__dirname}/../logs/app.log` },
    },
  ],
});
const logger = pino(stream);
logger.level = "debug";

export { logger };
