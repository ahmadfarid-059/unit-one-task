const { getItemByIdQuery } = require("../../database/queries");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id > 0) { // check if the id is a valid number
      const { rows: items } = await getItemByIdQuery(id);
      if (items.length) {
        return res.json(items[0]);
      }
      return res.status(404).json("No Items Found");
    }
    return res.status(400).json({
      message: "Bad Request",
    });
  } catch (err) {
    next(err);
  }
};
