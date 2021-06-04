const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;
// mysql://g5hti6f5pdgjjtwx:ruweghrfjkr1k72l@tvcpw8tpu4jvgnnq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ak51i5ru9c8r44dz

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
module.exports = sequelize;
