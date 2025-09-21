import express from 'express';
import { predictDropoutForAllUniversities } from '../Controllers/prediction.controller.js';

const router = express.Router();
router.get('/predictDropoutForAllUniversities', predictDropoutForAllUniversities);

export default router;