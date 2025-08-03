import mongoose from "mongoose";

const songsSchema = new mongoose.Schema({
    title: String,
    song: String
});

export default mongoose.model('Songs', songsSchema);