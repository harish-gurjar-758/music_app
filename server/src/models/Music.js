import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    title: String,
    music: String
});

export default mongoose.model('Songs', musicSchema);