export default (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false }
  });
};
