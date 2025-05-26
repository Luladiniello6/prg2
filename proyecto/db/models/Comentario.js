module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    productoId: {
      type: DataTypes.INTEGER
    },
    usuarioId: {
      type: DataTypes.INTEGER
    },
    texto: {
      type: DataTypes.TEXT
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
    tableName: 'comentarios',
    timestamps: true,
    paranoid: true
  });

  Comentario.associate = function(models) {
    Comentario.belongsTo(models.Producto, { foreignKey: 'productoId' });
    Comentario.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
  };

  return Comentario;
};
