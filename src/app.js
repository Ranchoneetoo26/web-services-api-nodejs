
require('module-alias/register');

// Importações de pacotes e middlewares
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const errorHandler = require('src/Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('src/Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const RedisTokenBlacklistRepository = require('src/Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository');
const JWTProvider = require('src/Infrastructure/Providers/JWTProvider');
const authRoutes = require('src/Infrastructure/Express/routes/routes');

// Importações dos Use Cases
const RegisterUser = require('./Application/UseCases/Auth/RegisterUser.js');
const LoginUser = require('./Application/UseCases/Auth/LoginUser.js');
const LogoutUser = require('./Application/UseCases/Auth/LogoutUser.js');

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


const userRepository = new SequelizeUserRepository();
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();


const jwtProvider = new JWTProvider();


const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);
const logoutUserUseCase = new LogoutUser(tokenBlacklistRepository);


app.use('/auth', authRoutes(
  registerUserUseCase,
  loginUserUseCase,
  logoutUserUseCase,
  tokenBlacklistRepository
));


try {
  const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger.yml', 'utf8'));
  // Acessível em http://localhost:3000/api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.error('Failed to load swagger.yml file:', e);
}


app.use(errorHandler);

module.exports = app;