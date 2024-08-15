'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.belongsToMany(models.roles, { // tabela secundária da relação
        through: models.usuarios_roles, // nome da tabela que será usada para relação
        as: 'usuario_roles', // apelido que será usado para tabela de relação
        foreignKey: 'usuario_id' // qual será o campo para a chave extrangeira dentro da tabela secundária
      })
      usuarios.belongsToMany(models.permissoes, {
        through: models.usuarios_permissoes,
        as: 'usuario_permissoes',
        foreignKey: 'usuario_id'
      })
    }
  }
  usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    defaultScope: {
      attributes: {
        exclude: ['senha']
      }
    }
  });
  return usuarios;
};