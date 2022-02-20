const { getItemsQuery } = require("../../database/queries");

module.exports = async (req, res, next) => {
  try {
      const {page} = req.params
    const { rows: items } = await getItemsQuery(0, 10);
    if (items.length) {
      return res.json(items);
    }
    res.status(404).json({
      message: "No Items Found",
    });
  } catch (err) {
    next(err);
  }
};
