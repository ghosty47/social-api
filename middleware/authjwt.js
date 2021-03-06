const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {

    let token = req.headers['access-token']

    if(!token) return res.status(403).json({msg: 'You must be logged in to access this site'})

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({msg: 'Invalid token'})

        req.user = decoded.findUser

        next()

    })
}

module.exports = verifyToken
