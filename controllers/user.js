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
        console.log("eeeee", err)
        response.status(409).send(err)
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

    const token = jwt.sign({ userId: user._id, username: user.name }, JWT_SECRET, { expiresIn: '1h' });
    let userDetails = {
        name: user.name,
        email: user.email,
        id: user._id
    }
    res.send({ token, userDetails });
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

        res.status(401).send('Invalid token');
    }
};


const updateUser = async (req, res, next) => {
    let a = req.params.id

    try {
        const { name, email, oldPassword, password, id } = req.body;
        if (!name || !email) {
            return res.status(400).send("Please fill email and name !!!")
        }
        if (!oldPassword && !password) {
            await User.findByIdAndUpdate(id, { email, name })
            let user = await User.findById(id)
            let userDetails = {
                name: user.name,
                email: user.email,
                id: user._id
            }
            return res.status(200).send(userDetails);
        }
        if (!oldPassword) {
            return res.status(400).send("Please fill Old Password ");
        }
        if (!password) {
            return res.status(400).send("Please fill New Password ");
        }
        const user = await User.findById(id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (isMatch) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(id, { email, name, password: hashedPassword })
            let user = await User.findById(id)
            console.log(user, "uuuuuu")
            let userDetails = {
                name: user.name,
                email: user.email,
                id: user._id
            }
            return res.status(200).send(userDetails);
        } else {
            return res.status(400).send("Old Password is invalid.Please input proper old password ");
        }



    } catch (err) {
        err.errorResponse.code == 11000 && res.status(409).send("Email Already Exists")
        next(err)
    }
}
module.exports = { createUser, loginUser, authMiddleware, updateUser }