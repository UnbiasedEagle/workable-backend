import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from '../controllers/authController.js';
import express from 'express';
import rateLimit from 'express-rate-limit';
const router = express.Router();
import authenticateUser from '../middlewares/auth.js';
import { testUser } from '../middlewares/test-user.js';

const apiLimiter = rateLimit({
  windowMs: 15 * 1000 * 60,
  max: 10,
  message:
    'Too many requests from this IP address. Please try again after 15 minutes',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/logout').get(logout);

export default router;
