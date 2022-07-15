import express from 'express';

import {
  userRegister,
  userLogin,
  profile,
} from '../controllers/userController.js';

import requireToken from '../middlewares/requireToken.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);

router.get('/profile', requireToken, profile);

export default router;
