import mysql from "mysql";
import logger from "../middleware/logger.middleware";
import config from "../config";

const { SQL_HOST, SQL_PORT, SQL_USER, SQL_PWD, DB_NAME } = config;

var connection = mysql.createConnection({
  host: SQL_HOST,
  port: SQL_PORT,
  user: SQL_USER,
  password: SQL_PWD,
  database: DB_NAME,
  insecureAuth: true,
});

connection.connect((err: any) => {
  if (err) throw "MySQL failed connection";
  logger.info("MySQL", "Connected", "PORT: " + SQL_PORT);
});

export function mySql(query: string) {
  return new Promise((resolve, reject) => {
    connection.query(query, function (err: any, res: any) {
      if (err) {
        reject(err);
        logger.error("MySQL", "Cannot execute command", err);
      } else resolve(res);
    });
  });
}
