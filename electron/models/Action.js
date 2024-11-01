const { model, Schema } = require("mongoose");

const ActionSchema = new Schema({
  date: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  info: String,
  type: String,
});

const Action = model("Action", ActionSchema);
const createAction = async ({ info, type }) => {
  await Action.create({ date: Date.now(), user: process.userId, info, type });
};

module.exports = { Action, createAction };