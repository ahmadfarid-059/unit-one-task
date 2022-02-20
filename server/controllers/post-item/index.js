const { itemSchema } = require("../../utils");
const { postItemQuery } = require("../../database/queries");

module.exports = async (req, res, next) => {
  try {
    console.log(req);
    await itemSchema.validateAsync(req.body);
    await postItemQuery(req.body);
    return res.status(201).json({
      messsage: "Posted New Item",
    });
  } catch (err) {
    if (err.details) {
      err.status = 400;
    }
    return next(err);
  }
};
