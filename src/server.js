require('dotenv').config();
require('module-alias/register');

const app = require('./app');
const sequelize = require('src/Infrastructure/Persistence/Sequelize/database');
const UserModel = require('src/Infrastructure/Persistence/Sequelize/models/UserModel');
const { connectRedis } = require('src/Infrastructure/Persistence/Redis/RedisClient');
const config = require('src/config/index');

const PORT = config.server.port;

async function startServer() {
  try {

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected and synchronized!');

    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Access API at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Sai do processo com erro
  }
}

startServer();