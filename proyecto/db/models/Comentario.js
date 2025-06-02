module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
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
    Comentario.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto'
    });
    Comentario.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'usuario'
    });
  };

  return Comentario;
};
