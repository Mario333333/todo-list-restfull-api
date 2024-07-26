const { JwtHelper } = require("../helpers");

let _userService = null;

class AuthService {

    constructor({UserService}){
        _userService = UserService;
    }

    async signUp(user){
        const {email} = user;
        const userExist = await _userService.getUserByUserName(email);

        if (userExist) {
            const error = new Error()
            error.status = 400;
            error.message = "User already exists";
            throw error
        }

        return await _userService.create(user)
  
    }
    async signIn(user){
        const {email, password} = user;
        const userExist = await _userService.getUserByUserName(email);
        

        if (!userExist) {
            const error = new Error()
            error.status = 404;
            error.message = "User does not exist";
            throw error
        }

        const validPassword = userExist.comparePasswords(password);

        if (!validPassword) {
            const error = new Error()
            error.status = 400;
            error.message = "Invalid Password";
            throw error
        }

        const userToEncode = {
            email: userExist.email,
            id: userExist._id,
        }

        const token = JwtHelper.generateToken(userToEncode);
        return {token, userExist:userToEncode}
    }
}

module.exports = AuthService