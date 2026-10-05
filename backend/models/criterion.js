'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Criterion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Criterion.hasMany(models.Evaluation, { foreignKey: 'criterionId' });
    }
  }
  Criterion.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maxScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Criterion',
  });
  return Criterion;
};