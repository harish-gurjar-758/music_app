import express from 'express';
import { getAllMusic, uploadMusic } from '../controllers/musicController.js';
import upload from '../middlewares/upload.js';


const router = express.Router();

router.post('/', upload.single('music'), uploadMusic);

router.get('/', getAllMusic);

export default router;