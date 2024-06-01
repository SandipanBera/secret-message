import mongoose from "mongoose";

type ConnectionObject = {
  connected?: number;
};
const connection: ConnectionObject = {};
async function dbConnect(): Promise<void> {
  if (connection.connected) {
    console.log("database already connected");
    return;
  }
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URL || "");
    connection.connected = dbConnection.connections[0].readyState;
    console.log(`MongoDB Connected: ${dbConnection.connections[0].host}`);
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(1);
  }
}
export default dbConnect;
