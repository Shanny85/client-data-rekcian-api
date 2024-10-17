import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectionToDatabase from './db/db.js'

const userRegistration = async () => {
    await connectionToDatabase()
    try {
        const hashPassword = await bcrypt.hash("Admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "smokeofwar@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error);
    }
}

userRegistration().then(r => {});