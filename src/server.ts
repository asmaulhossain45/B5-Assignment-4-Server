//src/server.ts
import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

let isConnected = false;
const connectDB = async () => {
  if (!isConnected) {
    await mongoose.connect(config.DB_URI, {
      dbName: config.DB_NAME,
    });
    isConnected = true;
    console.log("✅ Database connected");
  }
};

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
