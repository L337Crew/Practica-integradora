import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  roles: { type: String, default: 'usuario' },
});

export default mongoose.model('User', userSchema);