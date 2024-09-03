'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Local_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Local_User.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Local_User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "存入資料庫前的最後驗證：Email 格式錯誤！",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Local_User",
      tableName: "Local_Users", // 改變資料表名稱，以對應雲端資料庫
    }
  );
  return Local_User;
};