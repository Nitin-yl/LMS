import jwt from "jsonwebtoken"

// Optional auth - verifies token if present, but doesn't fail if missing
const optionalAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (token) {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
            if (verifyToken) {
                req.userId = verifyToken.userId
            }
        }
        // Continue even if no token
        next()
    } catch (error) {
        console.log("Optional auth error:", error)
        // Continue even if token verification fails
        next()
    }
}

export default optionalAuth
