import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nome não pode ficar vazio',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo sobrenome não pode ficar vazio',
          },
          isAlpha: {
            msg: 'Nome só pode conter letras',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Este email já está cadastrado',
        },
        validate: {
          notEmpty: {
            msg: 'Campo email não pode ficar vazio',
          },
          isEmail: {
            msg: 'Insira um email válido',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Campo idade não pode ficar vazio',
          },
          isInt: {
            msg: 'Idade precisa ser um número inteiro',
          },
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        validate: {
          isFloat: {
            msg: 'Peso precisa ser um número',
          },
        },
      },
      altura: {
        type: Sequelize.FLOAT,
        validate: {
          isFloat: {
            msg: 'Altura precisa ser um número',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  // Método presente no Model Foto, ambas as formas estão corretas
  // Foto pertence ao aluno ou aluno tem foto
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}
