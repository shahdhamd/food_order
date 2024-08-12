import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

////login user

const login = async (req, res) => {
    const { password, email } = req.body;
    console.log(password)

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user Doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        console.log(token)
        return res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error0" })
    }
}

/// create token

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)

}

///// register user


const register = async (req, res) => {
    const { name, password, email } = req.body
    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: 'user already exist' })
        }

        //validating email format && strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'please enter valid email' })
        }
        if (password.length < 5) {
            return res.json({ success: false, message: 'please enter strong password' })

        }
        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        return res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error' })
    }
}

export { register, login }