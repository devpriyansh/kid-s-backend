'use strict'
export default (sequelize, DataTypes) => {
  const ActivityResult = sequelize.define(
    'ActivityResult',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      child_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      quiz_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stars_earned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      coins_earned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      tableName: 'activity_results',
      timestamps: true
    }
  )

  ActivityResult.associate = function (models) {
    ActivityResult.belongsTo(models.Child, {
      foreignKey: 'child_id',
      as: 'child'
    })
    ActivityResult.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz'
    })
  }

  return ActivityResult
}
