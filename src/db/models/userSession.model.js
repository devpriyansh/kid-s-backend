'use strict'
export default (sequelize, DataTypes) => {
  const UserSession = sequelize.define(
    'UserSession',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
      }
    },
    {
      sequelize,
      underscored: true,
      tableName: 'user_sessions',
      timestamps: true
    }
  )

  UserSession.associate = function (models) {
    UserSession.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }

  return UserSession
}
