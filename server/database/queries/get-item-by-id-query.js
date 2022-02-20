const connection = require("../connection");

module.exports = (id) =>
  connection.query(
    `
    SELECT * FROM items
    WHERE id = $1
`,
    [id]
  );
