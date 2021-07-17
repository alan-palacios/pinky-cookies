dev = {
  db: "mongodb://localhost/pinkycookies",
};

prod = {
  db: "mongodb://localhost/pinkycookies",
};

env = process.env.NODE_ENV || "dev"

module.exports = (env === "production")?prod:dev;
