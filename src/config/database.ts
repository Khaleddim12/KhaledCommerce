import mongoose from "mongoose";

import colors from "colors";

//* @desc: Make a connection to mongodb
export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(
        colors.cyan.underline.bold(`MonogDB Connected: ${conn.connection.host}`)
      );
};