export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.TYPEORM_MYSQL_HOST,
    port: parseInt(process.env.DATABTYPEORM_MYSQL_PORTASE_PORT, 10) || 3306,
    user: process.env.TYPEORM_MYSQL_USER,
    password: process.env.TYPEORM_MYSQL_PASSWORD,
    db: process.env.TYPEORM_MYSQL_DB,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    EXP: process.env.JWT_EXP,
  },
});
