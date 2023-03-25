import Jwt from 'jsonwebtoken';
const jwt_secret_key = "mywebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader
        console.log(token);
        Jwt.verify(token, jwt_secret_key, (err, user) => {
            if (err) return res.status(400).json("Some error occured")
            req.user = user
            next();
        })
    } else {
        return res.status(400).json("Access Token is not valid")
    }
}
export { verifyToken }