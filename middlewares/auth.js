import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      errors: [{ msg: 'Unauthorized, invalid token' }],
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const isTestUser = payload.userId.toString() === '63c4e871e36ecff3052bd4fa';

    req.user = { userId: payload.userId, testUser: isTestUser };

    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
