import jsonwebtoken from "jsonwebtoken";

export function signToken(payload){
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

export function verifyToken(token) {
    try {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch {
        return null
    }
}