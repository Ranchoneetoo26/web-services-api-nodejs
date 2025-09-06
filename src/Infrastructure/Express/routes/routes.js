// src/Infrastructure/Express/routes/routes.js
const { Router } = require('express');
const AuthController = require('src/Infrastructure/Express/controllers/AuthController');
const validate = require('src/Infrastructure/Express/middlewares/validationMiddleware');
// AQUI ESTÁ A CORREÇÃO: Adicionado 's' em 'validationsSchemas'
const { registerSchema, loginSchema } = require('src/Infrastructure/Express/validationSchemas/authSchemas');

const createAuthMiddleware = require('src/Infrastructure/Express/middlewares/AuthMiddleware');

module.exports = (registerUserUseCase, loginUserUseCase, logoutUserUseCase, tokenBlacklistRepository) => {
    const router = Router();

    const authController = new AuthController(registerUserUseCase, loginUserUseCase, logoutUserUseCase);

    const authMiddleware = createAuthMiddleware(tokenBlacklistRepository);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));

    router.post('/logout', authMiddleware, authController.logout.bind(authController));


    router.get('/me', authMiddleware, (req, res) => {
        res.status(200).json({ message: 'This is a protected route', user: req.user });
    });

    return router;
};