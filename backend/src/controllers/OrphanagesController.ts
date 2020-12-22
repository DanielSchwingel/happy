import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';
import fs from 'fs';

export default {
	async index(request: Request, response: Response) {
		const orphanagesRepository = getRepository(Orphanage);
		const orphanages = await orphanagesRepository.find({
			relations: ['images'],
			where: { pending: 0 }
		});
		return response.json(orphanageView.renderMany(orphanages));	
	},

	async indexPending(request: Request, response: Response) {
		const orphanagesRepository = getRepository(Orphanage);
		const orphanages = await orphanagesRepository.find({
			relations: ['images'],
			where: { pending: 1 }
		});
		return response.json(orphanageView.renderMany(orphanages));	
	},

	async show(request: Request, response: Response) {
		const { id } = request.params;
		const orphanagesRepository = getRepository(Orphanage);
		const orphanage = await orphanagesRepository.findOneOrFail(id);
		return response.json(orphanageView.render(orphanage));	
	},

	async delete(request: Request, response: Response) {
		const { id } = request.params;
		const orphanagesRepository = getRepository(Orphanage);
		const orphanage = await orphanagesRepository.findOne(id);
		orphanagesRepository.remove(orphanage as Orphanage).then(()=> {
			orphanage?.images.map(image => {
				fs.unlink(`uploads/${image.path}`, (err) => {
					console.log(err)
				})
			})
			return response.sendStatus(200);
		})
	},

   async create(request: Request, response: Response) {
		const {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours, 
			open_on_weekends,
			whatsapp,
		} = request.body;
		const orphanagesRepository = getRepository(Orphanage);

		const requestImages = request.files as Express.Multer.File[];
		const images = requestImages.map(image => {
			return { path: image.filename }
		})
		console.log(images);
		const data = {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends: open_on_weekends === 'true',
			pending: 1,
			whatsapp,
			images 
		}

		const schema = Yup.object().shape({
			name: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			about: Yup.string().required().max(300),
			instructions: Yup.string().required(),
			opening_hours: Yup.string().required(),
			open_on_weekends: Yup.boolean().required(),
			whatsapp: Yup.number().required(),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string().required()
				})
			)
		});

		await schema.validate(data, {
			abortEarly: false,
		});

		const orphanage = orphanagesRepository.create(data); 
		await orphanagesRepository.save(orphanage);
		return response.status(201).json(orphanage);
	},

	async update(request: Request, response: Response) {
		const { id } = request.params;
		const {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends,
			pending,
			whatsapp
		} = request.body;

		const requestImages = request.files as Express.Multer.File[];

		const images = requestImages.map(image => {
			return { path: image.filename }
		})

		const orphanagesRepository = getRepository(Orphanage);
		const data = {
			id : Number(id),
			name: name,
			latitude,
			longitude,
			about,
			instructions,
			open_on_weekends : open_on_weekends === 'true',
			opening_hours,
			whatsapp,
			pending,
			images
		};
		try {
			const orphanage = await orphanagesRepository.preload(data);			
			await orphanagesRepository.save(orphanage as Orphanage);
			return response.json(orphanage)
			
			
			
			// return response.sendStatus(200);
		} catch (error) {
			return response.status(500).json({error});
		}

	}
}