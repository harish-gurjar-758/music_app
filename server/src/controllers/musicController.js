import Music from '../models/Music.js';

// Upload Music
export const uploadMusic = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title are required'
            });
        };

        const music = req.file?.path;
        const musics = new Music({
            title,
            music
        });

        await musics.save();

        res.status(201).json({
            success: true,
            data: musics
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all musics 

export const getAllMusic = async (req, res) => {
    try {
        const musics = await Music.find();
        res.status(200).json({
            success: true,
            data: musics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};