const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
require("dotenv").config()

const createUser = async(req, res) => {
    const { name, email, password } = req.body;
    
    try {
         const presentuser = await UserModel.findOne({email});
        if (presentuser) {
            res.send("You are Already Registered please login")
        }
        else {
            
            bcrypt.hash(password, 7, async (err, secure_password) => {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    const newUser = await UserModel({
                      name,
                      email,
                      password: secure_password,
                      ip_address: res.connection.remoteAddress,
                    });
                    await newUser.save()
                    res.send(" user registered successfully")
                }
            })
        }
    } catch (err) {
        console.log(err)
        res.send("Registration failed")
    }
}

const loginUser = async (req, res) => { 
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        const hashed_pass = user.password
        const ID = user._id;
        if (user) {
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                else if (result) {
                    const token = jwt.sign({ userID: ID }, process.env.KEY)
                    res.send({"mesage":"User Login Success with ","token":token})
                } else {
                    res.send("wrong credentials")
                }
            })
        } else {
            res.send(" last wrong credentials")
        }
    } catch (err) { 
        console.log(err)
        res.send(" login failed")
    }
}

module.exports ={createUser,loginUser}