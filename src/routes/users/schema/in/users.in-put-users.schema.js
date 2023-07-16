const { SEX } = require("../../../../database/constants");
const { enumArray } = require("../../../../database/helper");

module.exports = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          fullName: {
            type: "string",
            format: "fullName",
            errorMessage: {
              format: "should not have numbers nor special characters nor trailing spaces"
            }
          },
          username: {
            type: "string",
            format: "username",
            errorMessage: {
              format: "can't have blank spaces in the username"
            }
          },
          email: {
            type: "string",
            format: "email",
            errorMessage: {
              format: "is not in a valid format"
            }
          },
          password: {
            type: "string",
            format: "password",
            errorMessage: {
              format: "must have 8 characters, uppercase, lowercase, alphanumerical and special characters"
            }
          },
          phoneNumber: {type: "string"},
          sex: {type: "string", enum: enumArray(SEX)},
          interests: {
            type: "array",
            items: {type: "string"}
          }
        }
      },
      params: {
        type: "object"
      },
      query: {
        type: "object"
      },
      headers: {
        type: "object"
      }
    }
}
  