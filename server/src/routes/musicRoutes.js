// routes/musicRoutes.js
import express from 'express';
import upload from '../middlewares/upload.js';
import { uploadMusic, getAllMusic } from '../controllers/musicController.js';

const router = express.Router();

router.post('/', upload.single('music'), uploadMusic);
router.get('/', getAllMusic);

export default router;
