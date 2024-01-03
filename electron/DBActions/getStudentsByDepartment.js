const { Students } = require("../modes");

module.exports = async ({ depID }) => {
  try {
    const result = await Students.find({ department: depID });
    return result;
  } catch (err) {
    return null;
  }
};
