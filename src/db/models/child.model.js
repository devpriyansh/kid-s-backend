'use strict'
export default (sequelize, DataTypes) => {
  const Child = sequelize.define(
    'Child',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age_group: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'nursery, kg1, kg2'
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      total_stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_coins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
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
      tableName: 'children',
      timestamps: true
    }
  )

  Child.associate = function (models) {
    Child.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'parent'
    })
    Child.hasMany(models.ActivityResult, {
      foreignKey: 'child_id',
      as: 'activities'
    })
  }

  return Child
}
