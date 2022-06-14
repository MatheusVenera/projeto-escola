class HomeController {
  async index(req, res) {
    res.json('Home');
  }
}
export default new HomeController();
