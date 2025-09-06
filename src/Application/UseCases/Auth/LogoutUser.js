// src/Application/UseCases/Auth/LogoutUser.js
const jwt = require('jsonwebtoken');

class LogoutUser {
    constructor(tokenBlacklistRepository) {
        this.tokenBlacklistRepository = tokenBlacklistRepository;
    }

    async execute(token) {
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.exp) {

            return;
        }

        const expiresAt = decoded.exp;
        const now = Math.floor(Date.now() / 1000);

        const expiresIn = expiresAt - now;

        if (expiresIn > 0) {
            await this.tokenBlacklistRepository.add(token, expiresIn);
        }
    }
}

module.exports = LogoutUser;