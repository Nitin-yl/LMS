import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const rawUrl = process.env.MONGODB_URL && process.env.MONGODB_URL.trim()
        if (!rawUrl || (!rawUrl.startsWith("mongodb://") && !rawUrl.startsWith("mongodb+srv://"))) {
            console.error('Invalid MONGODB_URL environment variable. It must start with "mongodb://" or "mongodb+srv://"')
            console.error('Current value:', process.env.MONGODB_URL)
            process.exit(1)
        }
        await mongoose.connect(rawUrl)
        console.log("DB connected")
    } catch (error) {
        console.error("DB connection error:", error)
    }
}
export default connectDb