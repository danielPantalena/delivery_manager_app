import { Request, Response, NextFunction } from 'express';
import { errorResponse, generateToken, verifyToken } from '../helpers';

const authenticateToken = async ({ body, cookies }: Request, res: Response, next: NextFunction) => {
  const token = body.token ?? cookies.data.token;

  if (!token) return res.status(401).json(errorResponse('Sem Token'));
  if (!verifyToken(token)) return res.status(401).json(errorResponse('Token inválido'));
  return next();
};

export default authenticateToken;
