import express from 'express';
import { registerUniversity, login, logout, verify } from '../Controllers/auth.controller.js';

const router = express.Router();
router.post('/registerUniversity', registerUniversity); 
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verify);
export default router;