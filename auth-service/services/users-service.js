const User = require("../models/user");
const jwt = require("jsonwebtoken");
const PasswordHasher = require("./password-hasher");

module.exports = class UsersService {
    constructor() {
        this.passwordHasher = new PasswordHasher();
    }

    async create(user) {
        user.password = await this.passwordHasher.hash(user.password);
        user = await User.create(user);
        return await this.generateAccessToken(user);
    }

    async findAll() {
        let users = await User.find();
        return users.map(user => user.toJSON()).map(user => {
            delete user.password;
            return user;
        });
    }

    async findByEmail(email) {
        return await User.findOne({email});
    }

    async findById(id) {
        return await User.findOne({_id: id});
    }

    async signIn(email, password) {
        let user = await this.findByEmail(email);
        if (!user) {
            return null;
        }
        if(await this.passwordHasher.check(password, user.password) === true) {
            return await this.generateAccessToken(user);
        }
        else {
            return null;
        }
    }

    async generateAccessToken(user, audience = null) {
        if (!user) {
            throw new Error("Invalid user");
        }
        let userInfo = user.toJSON();
        delete userInfo.password;
        let payload = {
            user: userInfo
        };
        let reservedClaims = {
            algorithm: "HS256",
            issuer: process.env.TOKEN_ISSUER, //iss
            subject: `${user._id}`, //sub
            expiresIn: process.env.TOKEN_LIFESPAN, //exp
            audience: audience ? audience : 'all' //aud
        };
        const token = jwt.sign(payload, process.env.AUTH_SECRET, reservedClaims);
        return token;
    }
};
