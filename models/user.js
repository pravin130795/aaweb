module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING
        },
        created_at:{
            type:DataTypes.DATE
        }
    },{
        timestamps:false
    })

    return User;
}