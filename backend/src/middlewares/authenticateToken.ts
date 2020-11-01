import { Request, Response, NextFunction } from 'express';
import { errorResponse, generateToken, verifyToken } from '../helpers';

const authenticateToken = async (
  { body: { token } }: Request,
  res: Response,
  next: NextFunction
) => {
  if (!token) return res.status(401).json(errorResponse('Sem Token'));
  if (!verifyToken(token)) return res.status(401).json(errorResponse('Token inválido'));
  return next();
};

export default authenticateToken;
