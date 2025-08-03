import multer from 'multer';

const storage = multer.memoryStorage();

const audioMimeTypes = [
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/mp4',
  'audio/x-m4a',
  'audio/aac',
  'audio/ogg',
  'audio/flac',
  'audio/webm',
];

const fileFilter = (req, file, cb) => {
  if (audioMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
