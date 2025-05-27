module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombreImagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
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
    tableName: 'productos',
    timestamps: true,
    paranoid: true
  });

  Producto.associate = function(models) {
    Producto.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'usuario'
    });

    Producto.hasMany(models.Comentario, {
      foreignKey: 'productoId',
      as: 'comentarios'
    });
  };

  return Producto;
};
