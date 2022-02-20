const connection = require("../connection");

module.exports = ({ name, description }) =>
  connection.query(
    `
    INSERT INTO items 
    (name, description) 
    VALUES ($1, $2)
`,
    [name, description]
  );
