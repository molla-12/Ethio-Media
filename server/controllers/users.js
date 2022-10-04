import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) return res.status(404).json({ message: "User already exsist" });

        if (password != confirmPassword) return res.status(404).json({ message: "Passsword not match" });

        const encryptPassword = bcrypt.hashSync(password, 12);

        const result = await User.create({ email, password: encryptPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: "24h" });

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Server Not Found" });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) return res.status(404).json({ message: "User Not Found" });

        const validatePassword = await bcrypt.compare(password, oldUser.password);
        if (!validatePassword) return res.status(404).json({ message: "Incorrect Password" });
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, 'secret', { expiresIn: "24h" });
        res.status(200).json({ result: oldUser, token });

    } catch (error) {
        res.status(500).json({ message: "Server Not Found ... Plese try later" });

    }
}


