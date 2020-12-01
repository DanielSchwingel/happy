import { Request, Response } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

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
   }
}