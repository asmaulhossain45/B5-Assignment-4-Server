import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI, {
      dbName: config.DB_NAME,
    });
  } catch (error) {
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();

  app.listen(config.PORT, () => {
    console.log(`🚀 Server is running on port ${config.PORT}`);
  });
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime connection error:", err);
});

startServer();