const connection = require("../connection");

module.exports = (offset, limit) =>
  connection.query(
    `
    SELECT * ,COUNT(*) OVER()
    FROM items 
    OFFSET $1 ROWS 
    FETCH NEXT $2 ROWS ONLY;
`,
    [offset, limit]
  );
