const jwt = require('jsonwebtoken');

const ensureAuth = async (req, res, next) => {
    try {
        // console.log(req.headers);
        // console.log(req.body);
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decodedData); // { email: 'shayon@test.com', id: 1, iat: 1643326487, exp: 1643330087 }
            // console.log("=====================================================");
            // console.log("verify token - ", decodedData);
            req.userId = decodedData?.id;
            req.userRole = decodedData.role;
            next();
        } else {
            return res.status(401).json({ msg: 'Unauthorized - no token found' });
        }
    } catch (error) {
        // console.log(error);
        return res.status(401).json({ msg: 'Unauthorized', error });
    }
}



module.exports = ensureAuth;