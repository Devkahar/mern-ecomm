import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_DB_USER);
    const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.nd6mr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log("Db error");
    console.error(`Error: ${error.message}`.red.underline.bold)
    // process.exit(1)
  }
}

export default connectDB
