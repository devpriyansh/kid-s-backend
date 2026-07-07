'use strict'
export default (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    'Quiz',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      class_level: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'nursery, kg1, kg2'
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
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
      tableName: 'quizzes',
      timestamps: true
    }
  )

  Quiz.associate = function (models) {
    Quiz.hasMany(models.Question, {
      foreignKey: 'quiz_id',
      as: 'questions'
    })
    Quiz.hasMany(models.ActivityResult, {
      foreignKey: 'quiz_id',
      as: 'activities'
    })
  }

  return Quiz
}
