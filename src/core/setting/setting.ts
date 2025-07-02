export const SETTINGS = {
  PORT: process.env.PORT || 5001,
  MONGO_URL:
    process.env.MONGO_URL ||
    "mongodb+srv://zenkov241091:IXfaVo0Y7hJuifvB@cluster0.rkqmdcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  DB_NAME: process.env.DB_NAME || "blogger_platform",
};
