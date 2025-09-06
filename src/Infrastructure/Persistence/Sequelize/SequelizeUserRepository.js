const IUserRepository = require('../../../Domain/Repositories/IUserRepository');
const UserModel = require('./models/UserModel');
const User = require('../../../Domain/User/User');
const Password = require('../../../Domain/User/ValueObjects/Password');

/**
 * Esta é a implementação concreta da interface IUserRepository.
 * Ela usa o Sequelize para interagir com o banco de dados.
 */
class SequelizeUserRepository extends IUserRepository {

  /**
   * Método privado para converter os dados do Sequelize para a entidade de domínio 'User'.
   * @param {UserModel} userModel O objeto do Sequelize.
   * @returns {User|null} A entidade de domínio User ou null.
   * @private
   */
  _toEntity(userModel) {
    if (!userModel) {
      return null;
    }
    const { id, name, email, password: hashedPassword } = userModel.toJSON();
    const passwordVO = new Password(hashedPassword, true); // O 'true' indica que a senha já está hasheada
    return new User(name, email, passwordVO, id);
  }

  /**
   * Salva uma entidade User no banco de dados.
   * @param {User} userEntity A entidade de domínio.
   */
  async save(userEntity) {
    const userData = {
      id: userEntity.id,
      name: userEntity.name.value,
      email: userEntity.email.value,
      password: userEntity.password.hashedPassword,
    };

    const existingUser = await UserModel.findByPk(userData.id);

    if (existingUser) {
      await existingUser.update(userData);
    } else {
      await UserModel.create(userData);
    }
  }

  /**
   * Encontra um usuário pelo seu ID.
   * @param {string} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    const userModel = await UserModel.findByPk(id);
    return this._toEntity(userModel);
  }

  /**
   * Encontra um usuário pelo seu email.
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    const userModel = await UserModel.findOne({ where: { email } });
    return this._toEntity(userModel);
  }
}

module.exports = SequelizeUserRepository;

