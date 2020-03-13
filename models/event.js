module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
    time: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imageLink: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
  return Event;
};
