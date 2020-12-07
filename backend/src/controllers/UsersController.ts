import { Request, Response } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

import authentication from '../middlewares/authentication';
interface iUser {
   id: number,
   name: string
}
const saltRoudns = 10;

export default {
   async create(request: Request, response: Response){
      const { name, email, password } = request.body;

      const salt = bcrypt.genSaltSync(saltRoudns);
      const passwordCrypt = bcrypt.hashSync(password, salt);
      
      const userRepository = getRepository(User);

      const schema = Yup.object().shape({
			name: Yup.string().required(),
         email: Yup.string().required(),
         password: Yup.string().required(),
      });
      
      const data = { name, email, password: passwordCrypt }

		await schema.validate(data, {
			abortEarly: false,
		});

		const user = userRepository.create(data); 
		await userRepository.save(user);
		return response.status(201).json(user);
   },

   async authenticate(request: Request, response: Response){
      const { email, password } = request.body;

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({email});

      const match = await bcrypt.compare(password, String(user?.password))

      if (match) {
         const userJwt = {
            id: user?.id,
            name: user?.name
         } as iUser;
         const token = authentication.generateToken(userJwt);
         console.log(`token ${token}`)
         return response.status(200).json({token});
      }

      return response.json({message: 'deu ruim'});
   },

   show(request: Request, response: Response) {
      return response.status(200).json({id: 1, name:'Teste'})
   }
}