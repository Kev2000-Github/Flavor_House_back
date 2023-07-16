const { DEFAULT_PAGINATION } = require("./constants")

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

  module.exports.paginate = async (Model, options) => {
    const {limit = DEFAULT_PAGINATION.limit, offset = DEFAULT_PAGINATION.offset, where, include, order} = options
    const users = await Model.findAndCountAll({limit, offset, where, include, order})
    const totalPages = Math.ceil(users.count/limit)
    const result = {
      data: users.rows,
      page: offset + 1,
      items: limit,
      totalPages: totalPages,
    }
    return result
  }