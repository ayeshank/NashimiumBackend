const mongoose = require("mongoose");

const connectDb = (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "xnadb",
    };
    mongoose.connect(DATABASE_URL),
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;
