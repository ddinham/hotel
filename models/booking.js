module.exports = function (sequelize, DataTypes)
{
    var booking = sequelize.define("booking", {
        checkInDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        checkOutDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        specialRequests: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 250]
            }
        },
    });

    booking.associate = function (models)
    {
        booking.belongsTo(models.guest, {
            foreignKey: {
                allowNull: false
            }
        });

        booking.belongsTo(models.room, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return booking;
};


