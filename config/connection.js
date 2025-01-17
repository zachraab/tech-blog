const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;
// mysql://g5hti6f5pdgjjtwx:ruweghrfjkr1k72l@tvcpw8tpu4jvgnnq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ak51i5ru9c8r44dz

if (process.env.NODE_ENV === 'production') {
	const dbHost = process.env.DB_HOST;
	const dbPort = process.env.DB_PORT;
  sequelize = new Sequelize(
	process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
	{ 
		host: dbHost,
		dialect: 'mysql',
		port: dbPort
	}
  );
} else {
	const dbHost = process.env.DB_HOST;
	const dbPort = process.env.DB_PORT;
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
	{ 
		host: dbHost,
		dialect: 'mysql',
		port: dbPort
	}
  );
}
module.exports = sequelize;
