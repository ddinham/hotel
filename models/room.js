module.exports = function (sequelize, DataTypes)
{
  var room = sequelize.define("room",
    {
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          isDecimal: true
        }
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 15]
        }
      }
    },
    {
      timestamps: false
    });

  room.associate = function (models)
  {
    room.hasMany(models.booking, {
      onDelete: "cascade"
    });
  };

  return room;
};

