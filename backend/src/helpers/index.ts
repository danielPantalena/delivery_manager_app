import jwt from 'jsonwebtoken';

export const errorResponse = (message: string) => ({ error: true, message });

export const generateToken = (
  id: string,
  secretHash = process.env.SECRET_HASH ?? 'DeliveryManagerByDanielPantalena'
): string => jwt.sign({ id }, secretHash, { expiresIn: 86400 });

export const verifyToken = (token: string): boolean => {
  let result = false;
  jwt.verify(
    token,
    process.env.SECRET_HASH ?? 'DeliveryManagerByDanielPantalena',
    (err, decoded) => {
      if (err) return err;
      result = true;
    }
  );
  return result;
};
