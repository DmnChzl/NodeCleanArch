export default {
  dbPath: process.env['DB_PATH'] || ':memory:',
  port: Number(process.env['PORT']) || 8080
};
