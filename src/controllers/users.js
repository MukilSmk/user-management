import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
// const User = require('../models/user')
import {User} from '../models/user'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { authSchema } from '../helpers/validator'
import { token } from '../middleware/check-auth'
import Joi from 'joi'



/**
 * Declaration of the Mailsender 
 */
const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth : {
        user: "mukilselvam27@gmail.com",
        pass: 'Mukil@123'
    }
})
      
    
/**
 * Function that creates a new user
 * Valid user information should be passed to create a user
 */
exports.signup = async (req,res,next)=>{
  
    
    bcrypt.hash(req.body.password,10,(error,hash)=>{
        if(error){
            return res.status(500).json({
                error:err
            });            
        }else{
            const user = new User({
                _id : mongoose.Types.ObjectId(),
                name : req.body.name,
                mobile : req.body.mobile,
                email : req.body.email,
                password :hash
        });
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };
        const {error,value }= authSchema.validate(req.body , options)
        if (error){
            
            return res.status(500).json({                
              
              message: `Validation error: ${error.details.map(x => x.message).join(',')}`
            })
        }
        else{
        user
        .save()
        
        .then(result=>{
            console.log(result);
            const options = {
                from: "mukilselvam27@gmail.com",
                to: req.body.email,
                subject: "Welcome Mail",
                text: `Hi  ${req.body.name} , Welcome, to our Nodejs Application`
            }
            transporter.sendMail(options,function(err, info){
                if (err){
                    console.log(err)
                    return
                }
                console.log(info.response)
            })
            res.status(201).json({                
                message :'User Created Successfully',               
                createduser : result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error : err,
                message: 'Invalid Details'
            })
         
        
        });
    }
}
});
}


/**
 * Allows to login a user
 */
exports.login =async (req,res,next) => {
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length <1){
            return res.status(401).json({
                message : 'Auth failed'

            });
            
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            
            if(result){
               const token = jwt.sign({
                    email:user[0].email,
                    userId : user[0]._id
                },"secret",
                {
                    expiresIn : "1h"
                });
                return res.status(200).json({
                    message : "Auth Successful",
                    token : token
                })
            }
            res.status(401).json({
                message :'Invalid Password  '
            })

        });   
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })

    });


}; 

/**
 * Function that allows to update the user by his id
 */

exports.update = (req,res,next) =>{
    const id = req.params.userId;
    
    User.updateMany({_id : id},{$set: req.body})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);  
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}


/**
 *  Function that allows to Delete the user by his id
 */
exports.delete_user = (req,res,next) =>{
    const id = req.params.userId;
    User.remove({
        _id : id
    }).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({
            error : error
        })
    })

}

/**
 *  Function that allows to get all the users
 */

exports.all_users =(req,res,next) =>{
    const {page = req.params.page, limit = req.params.limit} = req.query
    User.find().limit(limit*1).skip((page-1)*limit)
    .select('name email mobile')
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            users: docs

        };
    res.status(200).json(response);   
    })
    
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});

    })
    
};



/**
 *  Function that allows to Get a user by his id
 */
exports.user_by_id = (req,res,next) =>{
    const id= req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc){
            res.status(200).json({
              name :  doc.name,
              mail :  doc.email,
              mobile : doc.mobile              
            });
        }else{
            res.status(404).json({message: 'No Matching Id '})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}