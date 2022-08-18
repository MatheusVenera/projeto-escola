import multer from 'multer';
import multerConfig from '../config/multerConfig';
import appConfig from '../config/appConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  save(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        if (req.file) {
          const { originalname, filename } = req.file;
          const { aluno_id } = req.body;
          const url = `${appConfig.url}/${filename}`.replace(/\\/g, '/');
          const foto = await Foto.create({
            originalname, filename, aluno_id, url,
          });
          return res.json(foto);
        }
        return res.status(400).json({
          errors: ['Você precisa enviar uma foto'],
        });
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}
export default new FotoController();
