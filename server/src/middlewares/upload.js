import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const storage = multer.memoryStorage({
    cloudinary,
    params: {
        folder: 'music-audios',
        allowed_formats: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'flac', 'webm'],
    },
});

const upload = multer({ storage });

export default upload;