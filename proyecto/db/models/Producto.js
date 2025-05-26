module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    usuarioId: {
      type: DataTypes.INTEGER
    },
    nombreImagen: {
      type: DataTypes.STRING
    },
    nombreProducto: {
      type: DataTypes.STRING
    },
    descripcion: {
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
    tableName: 'productos',
    timestamps: true,
    paranoid: true
  });

  Producto.associate = function(models) {
    Producto.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    Producto.hasMany(models.Comentario, { foreignKey: 'productoId' });
  };

  return Producto;
};
