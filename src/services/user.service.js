import { createHash, isValidPassword } from "../utils/utils.js";
import userRepository from "../repositories/user.repository.js";

class UserService {
    async registerUser(userData) {
        const existUser = await userRepository.getUserByEmail(userData.email);

        if (existUser) throw new Error("El email ya esta registrado!");

        userData.password = createHash(userData.password);
        return await userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);

        if(!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas");

        return user;
    }
}

export default new UserService();