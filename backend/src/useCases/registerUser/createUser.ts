import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { create } from '../../models/crud';
import { errorResponse, generateToken } from '../../helpers';

const createUser = async ({ body }: Request, res: Response) => {
  const { password, type } = body;
  body.createdAt = Date.now();
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    body.hashedPassword = hashedPassword;
    const userDocument = { ...body, password: undefined, hashedPassword };
    return create(type, userDocument).then((createdDoc) => {
      const { hashedPassword, ...data } = createdDoc;
      const token = generateToken(createdDoc._id);
      res.cookie('token', token).status(201).json({ data, token });
    });
  } catch ({ message }) {
    return res.status(500).json(errorResponse(message));
  }
};

export default createUser;
