const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const { createToken } = require('../middlewares/auth.js')




// Register User 
exports.register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'invalid data'
            })
        }


        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists." });
        }



        const hashPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            username, 
            email,
            password: hashPass,
        });


        const token = createToken(user._id, user.email);

        res.status(201).json({
            success: true,
            user,
            token
        })

    } catch (err) {
        return next(err);
    }
}


// Login User
exports.login = async (req, res, next) => {
    try {


        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter email and password'
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong credentials"
            })
        } else {


            const token = createToken(user._id, user.email);

            res.status(200).json({
                success: true,
                message: "User logged in successfull",
                token
            })
        }

    } catch (err) {
        return next(err);
    }
}



// isLogin
exports.isLogin = async (req, res, next) => {
    try {
        const user = req.user;

        if (user) {
            return res.status(200).json({
                success: true,
                isLogin: true
            })
        }
        if (!user) {
            return res.status(200).json({
                success: true,
                isLogin: false
            })
        }

    } catch (err) {
        return next(err);
    }
}



exports.getUser = async (req, res, next) => {
    try {

        return res.status(200).json({
            success: true,
            user: req.user
        })

    } catch (err) {
        return next(err);
    }
}





