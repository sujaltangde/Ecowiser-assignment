const express = require('express')
const { register, login, isLogin, getUser } = require('../controllers/userControllers')
const { isAuthenticated } = require('../middlewares/auth')
const router = express.Router()


router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/verify").get(isAuthenticated, isLogin);

router.route("/user").get(isAuthenticated, getUser);




module.exports = router