import { Request, Response, NextFunction } from 'express';
import { readOneByUser } from '../models/crud';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    body: { user },
    baseUrl,
  } = req;

  if (!/^[a-z]{5,12}$/i.test(user))
    return res.status(400).json({
      error: true,
      message: 'O usuário deve ter entre 5 e 12 caracteres e conter apenas letras',
    });

  const userRegistered = await readOneByUser(baseUrl.substring(1), user);

  if (userRegistered)
    return res
      .status(422)
      .json({ error: true, message: 'Este usuário já existe, por favor tente outro' });

  return next();
};

export default validateUser;
