import { Request, Response, NextFunction } from 'express';
import { readOneByUser } from '../models/crud';
import { errorResponse } from '../helpers';

const validateUser = async (
  { body: { user, password }, baseUrl }: Request,
  res: Response,
  next: NextFunction
) => {
  const userRegistered = await readOneByUser(baseUrl.substring(1), user);

  if (userRegistered)
    return res
      .status(422)
      .json({ error: true, message: 'Este usuário já existe, por favor tente outro' });

  if (!/^[a-z]{5,12}$/i.test(user) || !user)
    return res
      .status(400)
      .json(
        errorResponse(
          'O body da requisição deve conter a chave "user" com o valor de uma string entre 5 e 12 caracteres e conter apenas letras!'
        )
      );

  if (!/^\w{6,14}$/.test(password) || !password)
    return res
      .status(400)
      .json(
        errorResponse(
          'O body da requisição deve conter a chave "password" com o valor de uma string entre 6 e 14 caracteres e conter apenas letras, numeros e/ou _'
        )
      );

  return next();
};

export default validateUser;
