import { userModel } from "../models/userModel.js"

export class UserManagerMongo{
    constructor(){
        this.model = userModel;
    };

    async save(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            throw error;
        }
    };

    async getById(userId){
        try {
            const user = await this.model.findById(userId);
            if(user){
                return user;
            } else{
                throw new Error("El usuario no existe");
            }
        } catch (error) {
            throw error;
        }
    };

    async getByEmail(userEmail){
        try {
            const user = await this.model.findOne({email:userEmail});
            if(user){
                return user;
            } else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    };
}