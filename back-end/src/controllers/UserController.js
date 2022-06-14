import User from '../models/User';

class UserController {
  // Adicionar usuário
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Mostrar todos os usuários

  async listarUsuarios(req, res) {
    try {
      const listaUsuarios = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(listaUsuarios);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Mostra somente um usuário procurando pelo ID (Primary Key)
  async findUserById(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.json('Você precisa passar um id');
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }
      const { nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.userID);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não cadastrado'],
        });
      }
      const novoUsuario = await user.update(req.body);
      const { id, nome, email } = novoUsuario;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Deletar usuário pelo ID
  async deleteUserById(req, res) {
    try {
      const user = await User.findByPk(req.userID);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não cadastrado'],
        });
      }

      await user.destroy();
      return res.status(200).json('Usuário deletado com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new UserController();
