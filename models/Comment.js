export default (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    content: { type: DataTypes.TEXT, allowNull: false }
  });
};
