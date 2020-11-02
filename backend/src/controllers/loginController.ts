import express from 'express';
import { authenticateUser, authenticateToken, validateUser } from '../middlewares';

const router = express.Router();

router.post(
  '/login',
  authenticateUser,
  authenticateToken,
  async ({ body: { user, token } }, res) => {
    res.status(200).json({ user, token });
  }
);

router.post('/logout', async (_req, res) =>
  res.clearCookie('data').status(204).redirect('/')
);

export default router;
