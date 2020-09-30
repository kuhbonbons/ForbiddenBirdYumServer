const {
  Model,
} = require('sequelize');
const equal = require('deep-equal');

module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static getPatchedSections(sections, patchedSections) {
      return patchedSections.reduce((acc, patchedSection) => {
        const match = sections.find((s) => s.id === patchedSection.id);
        if (match) {
          if (!equal(patchedSection, match)) {
            return { ...acc, diffs: [...acc.diffs, patchedSection] };
          }
          return acc;
        }
        return { ...acc, latest: [...acc.latest, patchedSection] };
      }, { diffs: [], latest: [] });
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.Note, { constraints: true, foreignKey: 'note_id' });
    }
  }
  Section.init({
    keyword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};
