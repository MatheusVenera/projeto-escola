import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// TODO adicionar o middleware loginRequired novamente, retirado para facilitar os testes
router.delete('/deleteAluno/:id', alunoController.deleteAluno);
router.put('/updateAluno/:id', alunoController.updateAluno);
router.post('/createAluno', alunoController.createAluno);
router.get('/listAlunos', alunoController.listarAlunos);
router.get('/findAluno/:id', alunoController.findAluno);

export default router;
