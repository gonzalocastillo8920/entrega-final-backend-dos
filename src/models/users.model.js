import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    age: Number,
    password: {
        type: String,
        required: true
    },
    cart: String,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const Usermodel = mongoose.model("users", userSchema);

export default Usermodel;