import { verifyToken } from "../utils/jwt.js"

export function authenticate(req, res, next){
    const authHeader = req.headers.authorization;


    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({
            error: "No token provided."
        })

        return
    }

    const token = authHeader.split(" ")[1];

    

    const decodedPayload = verifyToken(token);

    if(!decodedPayload){
        res.status(401).json({
            error: "Invalid or expired token."
        })
        
        return
    }



    req.user = decodedPayload;
    next()
}