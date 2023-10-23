import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  roles: [{ type: String, default: 'usuario' }], // Debe ser un Array de Strings
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema);