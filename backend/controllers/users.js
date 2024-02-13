
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password, address, contact } = req.body;
        const salt = await bcrypt.genSalt();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ exists: true, success: false, message: "Email is already registered, please use a different one" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                fullname: fullname,
                email: email,
                password: hashedPassword,
                address: address,
                contact: contact
            })
            const savedUser = await user.save();
            res.status(200).json(savedUser);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Error in registering user!" });
        console.log(error);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(409).json({ success: false, message: "User not found!" })
            console.log(user)
        }
        else {
            const passwordMatch = bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
            res.status(200).json({ token });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed due to internal server error' });
    }
}
export const getUserByJwt = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "error in getting user jwt", error: error.message });
    }
}

export const updateUser = (async (req, res) => {
    try {
        const userId = req.user.userId;
        const fullname = req.body.fullname;
        const email = req.body.email;
        const address = req.body.address;
        const contact = req.body.contact;

        const user = await User.findOne({ _id: userId });
        console.log(user);

        user.fullname = fullname;
        user.email = email;
        user.address = address;
        user.contact = contact;
        await user.save();

        res.status(200).json({ data: { user } });

    } catch (error) {
        res.status(500).json({ message: "error in updating user info", error: error.message });
    }
})

export const updateUserPassword = (async (req, res) => {
    try {
        const userId = req.user.userId;
        const password = req.body.password;
        const newpassword = req.body.newpassword;
        const user = await User.findOne({ _id: userId });
        console.log("user : ", user);
        console.log("password : ", password);
        console.log("userpassword : ", user.password);
        console.log("newpassword : ", newpassword);
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (passwordMatch) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newpassword, salt);
            user.password = hashedPassword;
            user.save();
            res.status(200).json({ message: "Password updated" });
        }
        else {
            res.status(409).json({ message: "Incorrect Current Password!", Incorrect: false });
        }

    } catch (error) {
        res.status(500).json({ message: "error in updating user password", error: error.message });
    }
})

