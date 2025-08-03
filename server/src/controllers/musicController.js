import Music from '../models/Music.js';
import { v2 as cloudinary } from 'cloudinary';

// Upload Music Controller
export const uploadMusic = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No audio file uploaded',
      });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video', // For audio files, Cloudinary requires 'video'
          folder: 'music-audios',
          public_id: `music-${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    const music = new Music({
      title,
      music: result.secure_url,
    });

    await music.save();

    res.status(201).json({
      success: true,
      data: music,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Musics
export const getAllMusic = async (req, res) => {
  try {
    const musics = await Music.find();
    res.status(200).json({
      success: true,
      data: musics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
