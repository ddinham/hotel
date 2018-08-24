module.exports = function (sequelize, DataTypes)
{
    var guest = sequelize.define("guest", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //isEmail: true
            }
        },
    });

    guest.associate = function (models)
    {
        guest.hasMany(models.booking, {
            onDelete: "cascade"
        });
    };
    return guest;
};

