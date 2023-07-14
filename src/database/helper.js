module.exports.enumFields = (DataTypes, enumValues, defaultValue, options) => {
    const values = Object.entries(enumValues).map(([k, v]) => v)
    return {
      type: DataTypes.ENUM,
      values,
      defaultValue,
      allowNull: false,
      validate: {
        isIn: {
          args: [values],
          msg: `the field only accepts the following options: ${values}`
        }
      },
      ...options
    }
  }
  
  module.exports.enumArray = (enumValues) => {
      return Object.entries(enumValues).map(([k, v]) => v)
  }