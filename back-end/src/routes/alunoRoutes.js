import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// TODO adicionar o middleware loginRequired novamente, retirado para facilitar os testes
router.delete('/deleteAluno/:id', loginRequired, alunoController.deleteAluno);
router.put('/updateAluno/:id', loginRequired, alunoController.updateAluno);
router.post('/createAluno', loginRequired, alunoController.createAluno);
router.get('/listAlunos', loginRequired, alunoController.listarAlunos);
router.get('/findAluno/:id', loginRequired, alunoController.findAluno);

export default router;
