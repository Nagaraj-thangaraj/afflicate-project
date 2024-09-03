const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = () => {
  mongoose
    .connect(
      //mongodb+srv://dev:T3MfgFBYJomFGIx5@cluster0.oh21qce.mongodb.net/
      `mongodb+srv://bgminsta008:${process.env.MONGODB_PASSWORD}@cluster0.oh21qce.mongodb.net/?retryWrites=true`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Set a higher value than the default 30000 (30 seconds)
      }
    )
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};

connectDb();

exports.connectDb = connectDb;
