import express from 'express';
import { storeDataLinks, refreshPrediction, predictDropout } from '../Controllers/prediction.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/predictdropout', predictDropout);
router.get('/refreshPrediction', refreshPrediction);
router.post('/storedatalinks', storeDataLinks);

export default router;