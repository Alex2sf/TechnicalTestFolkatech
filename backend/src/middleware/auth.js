const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({ message: 'Akses ditolak ! Anda Belum Login'});
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch (err){
        return res.status(401).json({message:'Token anda kadarluasa atau tidak valid'});
    }

}

module.exports = authMiddleware;    