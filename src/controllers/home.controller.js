let _homeService = null;

class HomeController {
  // if awilix see that constructor require this class it inyect the dependencie
  constructor({ HomeService }) {
    _homeService = HomeService;
  }
  index(req, res) {
    return res.send(_homeService.index());
  }
}

module.exports = HomeController;
