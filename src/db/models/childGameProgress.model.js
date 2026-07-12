'use strict'
export default (sequelize, DataTypes) => {
  const ChildGameProgress = sequelize.define(
    'ChildGameProgress',
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
      times_played: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      best_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      tableName: 'child_game_progress',
      timestamps: true
    }
  )

  ChildGameProgress.associate = function (models) {
    ChildGameProgress.belongsTo(models.Child, {
      foreignKey: 'child_id',
      as: 'child'
    })
    ChildGameProgress.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz'
    })
  }

  return ChildGameProgress
}
