import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    music: {
        type: String,
        require: true,
    }
});

export default mongoose.model('Songs', musicSchema);