require('dotenv').config();
const User = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res, next) => {

    try {
        const { email, name, password } = req.body;
        console.log(email, name, password)
        if (!email || !name || !password) {
            return res.status(400).send("Please fill all the fields!!!")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            name,
            password: hashedPassword
        })

        await newUser.save();
        res.status(201).send("User Registered Successfully");

    } catch (err) {

        err.errorResponse.code == 11000 && res.status(409).send("Email Already Exists")
        next(err)
    }
}



const loginUser = async (req, res, next) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.send({ token });
}

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access denied');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.log(token, jwt.verify(token, JWT_SECRET))
        res.status(401).send('Invalid token');
    }
};


module.exports = { createUser, loginUser, authMiddleware }