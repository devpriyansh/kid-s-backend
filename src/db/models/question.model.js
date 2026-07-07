'use strict'
export default (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      quiz_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      options: {
        type: DataTypes.JSONB,
        allowNull: false,
        comment: 'Array of strings or objects representing options'
      },
      correct_answer_index: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'text',
        comment: 'text, image, pop-balloon, etc.'
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
      tableName: 'questions',
      timestamps: true
    }
  )

  Question.associate = function (models) {
    Question.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz'
    })
  }

  return Question
}
