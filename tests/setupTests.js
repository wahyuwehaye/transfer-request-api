const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    // connect your mongoose to this uri
});

afterAll(async () => {
    await mongod.stop();
});
