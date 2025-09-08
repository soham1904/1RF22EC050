module.exports = function (req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
  process.stdout.write(log + '\n'); // Custom logging instead of console.log
  next();
};