// src/Infrastructure/Express/controllers/AuthController.js
const RegisterUser = require('../../../Application/UseCases/Auth/RegisterUser');
const userRepository = require('../../Persistence/Sequelize/SequelizeUserRepository');
const registerUseCase = new RegisterUser(userRepository);
const RegisterUserInput = require('src/Application/DTOs/RegisterUserInput');
const LoginUserInput = require('src/Application/DTOs/LoginUserInput');


class AuthController {
  // O construtor agora recebe o novo caso de uso de logout
  constructor(registerUserUseCase, loginUserUseCase, logoutUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
    this.logoutUserUseCase = logoutUserUseCase; // Adicionado
  }

  async register(req, res, next) {
  try {
        console.log('Register body:', req.body); // debug: verifica se password vem no body
        const { name, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ status: 'error', message: 'password is required' });
        }

        const input = new RegisterUserInput(name, email, password);
        const created = await registerUseCase.execute(input);
        return res.status(201).json(created);
      } catch (err) {
        next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const input = new LoginUserInput(email, password);
      const authOutput = await this.loginUserUseCase.execute(input);
      return res.status(200).json(authOutput);
    } catch (error) {
      next(error);
    }
  }

  // Lógica de logout implementada
  async logout(req, res, next) {
    try {

      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token) {
        await this.logoutUserUseCase.execute(token);
      }
      
      return res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;