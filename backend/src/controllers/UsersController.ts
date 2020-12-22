import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import mailer from '../services/mailer';

const saltRoudns = 10;


export default {
   async create(request: Request, response: Response){
      const { name, email, password } = request.body;      

      const userRepository = getRepository(User);

      const schema = Yup.object().shape({
			name: Yup.string().required(),
         email: Yup.string().required(),
         password: Yup.string().required(),
      });

      const data = { name, email, password };

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
         const token = jwt.sign({
            id: user?.id,
            name: user?.name
         }, 
         String(process.env.SECRET_KEY_API), 
         {
            expiresIn: 86400
         });
         return response.status(200).json({
            user : {
               id: user?.id, 
               name: user?.name
            }, 
            token 
         });
      }

      return response.status(401).json({message: 'Dados inválidos'});
   },

   async forgot_password(request: Request, response: Response) {
      const { email } = request.body;
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({email});
      if (!user) {
         return response.json({ 
            success: false,
            error: 'Usuário não localizado, verifique!' 
      });
      }

      const salt = bcrypt.genSaltSync(saltRoudns);
      const tokenResetPassword = bcrypt.hashSync(user.name, salt);
      const dateExpirationResetPassword = new Date();
      dateExpirationResetPassword.setHours(dateExpirationResetPassword.getHours()+1);
   
      await userRepository.update(user.id, {
         token_rp: tokenResetPassword,
         date_expiration_rp: dateExpirationResetPassword,
      })

      try {
         await mailer.sendMail({
            from: process.env.AUTH_USER_MAIL,
            to: email,
            subject: `Recuperação de senha: ${user.name}`,
            text: `Atualize sua senha através do seguinte link http://localhost:3000/reset-password?token=${tokenResetPassword}`
         })

         
         return response.status(200).json({
            success: true
         });
      } catch (error) {
         return response.status(500).json({ 
            success: false,
            error: `Não foi possível enviar o e-mail: ${error}` 
         });
      }
   },

   async reset_password(request: Request, response: Response) {
      const { tokenResetPassword, password } = request.body;
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ token_rp: tokenResetPassword });
      const now = new Date;
      if (user) {
         user.password = password;
         if (user?.date_expiration_rp > now) {
            await userRepository.save(user);
            return response.sendStatus(200);
         }else{
            return response.status(500).json({erro: 'Link expired'})
         }
      }

      return response.status(404).json({erro: 'Token invalid'})

   }
}