import { jwtVerify } from "jose";

const validate = (token) => {
    const validToken = true;
    if (!validToken || !token) {
        return false
    }
    return true
}


export async function authMiddleware(req) {
    const token = req.cookies.get("jwt")?.value;

    if (!token) {
        return { isValid: false };
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const { payload } = await jwtVerify(token, secret);

        return {
            isValid: validate(token),
            payload,
        };

    } catch {
        return { isValid: false };
    }
    
}