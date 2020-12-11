import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

import uploadConfig from './config/upload';

import authMiddleware from './middlewares/authMiddleware';


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.post('/orphanages', upload.array('images') ,OrphanagesController.create);
routes.put('/orphanages/:id', authMiddleware.verifyJWT, OrphanagesController.update);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.delete('/orphanages/:id', authMiddleware.verifyJWT, OrphanagesController.delete);


routes.post('/users', UsersController.create);
routes.post('/authenticate', UsersController.authenticate);


routes.get('/dashboard', authMiddleware.verifyJWT, OrphanagesController.index);
routes.get('/pending', authMiddleware.verifyJWT, OrphanagesController.indexPending);






export default routes;