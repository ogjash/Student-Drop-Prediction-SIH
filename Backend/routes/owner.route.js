import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { isOwner } from '../middlewares/auth.middleware.js';
import { registerUsers } from '../Controllers/auth.controller.js';
import { removeUsers } from '../Controllers/auth.controller.js';
import { listUsers, transferOwnership } from '../Controllers/owner.controller.js';

const router = express.Router();
router.use(authenticateToken);
router.use(isOwner);

router.post('/registerUser', registerUsers);
router.post('/removeUser', removeUsers);
router.get('/listUsers', listUsers);
router.post('/transferOwnership', transferOwnership);

export default router;