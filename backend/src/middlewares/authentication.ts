import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface iUser {
   id: number,
   name: string
}

export default {
   generateToken(user: iUser){     
      const token = jwt.sign({
         id: user.id,
         name: user.name
      }, 
      String(process.env.SECRET_KEY_API), 
      {
         expiresIn: 500
      });
      return token;
   },

   verifyToken(request: Request, response: Response, next: Function) {
      const token = request.headers['authorization'];
      if (!token) return response.status(401).json({ auth: false, message: 'Token de autenticação não encontrado' });
      jwt.verify(token, String(process.env.SECRET_KEY_API), function(err, decoded) {
         if(err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
         console.log(decoded)
         next();
      });
   }
}

