import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readOneByUser } from '../models/crud';
import { errorResponse, generateToken, verifyToken } from '../helpers';

const authenticateUser = async (
  { body: { user, password }, baseUrl }: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    
    const registeredUser = await readOneByUser(baseUrl.substring(1), user);
    
    if (!registeredUser) return res.status(400).json(errorResponse('Usuário não encontrado'));
    
    if (!password) return res.status(401).json(errorResponse('Insira a senha'));
    
    const { _id, hashedPassword } = registeredUser;
    
    const passwordIsValid = await bcrypt.compare(password, hashedPassword);
    
    if (!passwordIsValid) return res.status(401).json(errorResponse('Senha incorreta'));
    
    const token = await generateToken(_id);

    console.log('user', token)
    
    await res.cookie('token', token);
    
    return next();
  } catch ({ message }) {
    res.status(500).json(errorResponse(message));
  }
};

export default authenticateUser;
