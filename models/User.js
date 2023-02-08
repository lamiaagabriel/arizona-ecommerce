import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: String, required: true, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
