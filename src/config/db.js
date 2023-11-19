import mongoose from 'mongoose'

export default async function connectDB (url) {
  try {
    await mongoose.connect(url)
    console.log('DB connected')
    return true
  } catch (e) {
    return false
  }
}
