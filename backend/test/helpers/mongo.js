// test/helpers/mongo.js
const net = require("net");
const { MongoMemoryServer } = require("mongodb-memory-server");

const getFreePort = () =>
  new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.on("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

const startMongo = (port) =>
  MongoMemoryServer.create(port ? { instance: { port } } : undefined);

const silentLogger = { log() {}, warn() {}, error() {} };

module.exports = { getFreePort, startMongo, silentLogger };
