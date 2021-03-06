import jwt from 'jsonwebtoken'
export const token = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        req.userData = decoded
        next();  
    }

    catch (error){
        return res.status(404).json({
            message : "invalid token"
        });
    }
}