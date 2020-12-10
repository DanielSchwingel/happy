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
         return response.status(401).json({message: 'sem token'});
      }
      const token = authorization.replace('Bearer', '').trim();
      
      try {
         const data = jwt.verify(token, String(process.env.SECRET_KEY_API))
         const { id, name } = data as iUserAuthData;
         request.userId = id;
         request.userName = name;
         next();
      } catch {
         return response.status(401).json({message: 'token não confere'});
      }
   }
}



