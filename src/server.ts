import mongoose from "mongoose";
import config from "./app/config/index";
import app from "./app";

const dbConnect = () => {
  try {
    mongoose.connect(config.DB_URI, {
      dbName: config.DB_NAME,
    });
    console.log("✅ Database connected");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
