module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fotoPerfil: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'usuarios',
    timestamps: true,
    paranoid: true
  });

  Usuario.associate = function(models) {
    Usuario.hasMany(models.Producto, { foreignKey: 'usuarioId' });
    Usuario.hasMany(models.Comentario, { foreignKey: 'usuarioId' });
  };

  return Usuario;
};
