import express from "express"
import bcrypt from "bcryptjs"

import { findByUsername } from "../utils/db.js"
import { signToken } from "../utils/jwt.js"

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    
    if(!username || !password){
        res.status(400).json({
            message: "Password and username is required"
        })

        return
    }

    const user = findByUsername(username);

    if(!user){
        res.status(401).json({
            message: "Invalid credentials"
        })

        return
    }

    const passMatch = await bcrypt.compare(password, user.passwordHash);

    if(!passMatch){
        res.status(401).json({
            message: "Invalid credentials"
        })

        return
    }

    const token = signToken({ id: user.id, role: user.role })

    res.status(200).json({
        token
    })

})

export default router;