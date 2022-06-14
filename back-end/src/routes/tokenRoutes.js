import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

router.post('/create', tokenController.create);

export default router;
