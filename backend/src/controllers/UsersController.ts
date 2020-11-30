import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const saltRoudns = 10;

export default {
   async create(request: Request, response: Response){
      const { password } = request.body;

      const salt = bcrypt.genSaltSync(saltRoudns);
      const passwordCrypt = bcrypt.hashSync(password, salt)

      return response.json({passwordCrypt});
   }
}