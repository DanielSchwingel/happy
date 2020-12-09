import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface iUserAuthData{
   id: number,
   name: string,
   iat: number,
   exp: number,
}

export default {
   verifyJWT(request: Request, response: Response, next: NextFunction) {
      const { authorization } = request.headers;
      if (!authorization) {
         return response.sendStatus(401);
      }
      const token = authorization.replace('Baerer', '').trim();
      
      try {
         const data = jwt.verify(token, String(process.env.SECRET_KEY_API))
         const { id, name } = data as iUserAuthData;
         request.userId = id;
         request.userName = name;
         next();
      } catch {
         return response.sendStatus(401);
      }
   }
}



