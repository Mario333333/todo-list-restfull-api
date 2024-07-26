const BaseService = require("./base.service")
let _userRepository = null;

class UserService extends BaseService {


    constructor({ UserRepository }) {
        super(UserRepository)
        _userRepository = UserRepository
    }

    async getUserByUserName(email) {
       
        return await _userRepository.getUserByUserName(email)
    }
}


module.exports = UserService;