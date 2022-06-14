import { Router } from 'express';
// import loginRequired from '../middlewares/loginRequired';
import userController from '../controllers/UserController';

const router = new Router();

// TODO adicionar o middleware loginRequired novamente, retirado para facilitar os testes
router.delete('/deleteUser/', userController.deleteUserById);
router.put('/updateUser/', userController.updateUser);
router.post('/criarUsuario', userController.create);
// Não podem ter acesso livre
router.get('/listarUsuarios', userController.listarUsuarios); // Lista usuário
router.get('/findUserById/:id', userController.findUserById);

export default router;
