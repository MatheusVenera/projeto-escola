import { Router } from 'express';
import fotoController from '../controllers/FotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// TODO adicionar o middleware loginRequired novamente, retirado para facilitar os testes
router.post('/save', loginRequired, fotoController.save);

export default router;
