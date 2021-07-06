dev = {
  db: "mongodb://localhost/pinkycookies",
};

prod = {
  db: "mongodb://localhost/pinkycookies",
};

env = "dev"; //process.env.NODE_ENV

module.exports = (env === "prod")?prod:dev;
