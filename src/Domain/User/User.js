const Email = require('./ValueObjects/Email');
const Password = require('./ValueObjects/Password');
const Name = require('./ValueObjects/Name');
const { v4: uuidv4 } = require('uuid');

class User {
    constructor(name, email, plainPassword, id = uuidv4()) {
        if (!id || !name || !email || !plainPassword) {
            throw new Error("User properties cannot be empty.");
        }
        this.id = id;
        this.name = new Name(name);
        this.email = new Email(email);

        this.password = new Password(plainPassword);
    }


    static hydrate(id, name, email, hashedPassword) {
        const user = Object.create(User.prototype);
        user.name = new Name(name);
        user.email = new Email(email);

        user.password = new Password(hashedPassword, true);
        return user;
    }

    async comparePassword(plainPassword) {
        return await this.password.compare(plainPassword);
    }

    updatePassword(newPassword) {
        this.password = new Password(newPassword);
    }

    toObject() {
        return {
            id: this.id,
            name: this.name.value,
            email: this.email.value,
            password: this.password.hashedPassword
        };
    }
}

module.exports = User;