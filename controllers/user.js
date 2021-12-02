const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler')
const {Order} = require('../models/order')

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((error,user)=>{
        if(error)
        {
            res.status(400).json({
                error:'User not found'
            })
        }
        req.profile = user;
        next();
    })
}

exports.read = (req,res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.update = (req,res) =>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true},
        (err,user)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"You are not authorised to perform this action"
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user);
        })
}

exports.addOrderToUserHistory = (req,res,next)=>{
    let history = []

    req.body.order.products.forEach((item)=>{
        history.push({
            _id:item._id,
            name:item.name,
            quantity:item.count,
            category:item.category,
            description:item.description,
            transaction_id:req.body.order.transaction_id,
            amount:req.body.order.amount
        })
    })

    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$push:{history:history}},
        {new:true},
        (error,data)=>{
            if(error)
            {
                return res.status(400).json({
                    error:"Error updating user purchase history"
                })
            }
            next()
        })
}

exports.purchaseHistory = (req,res)=>{
    Order.find({user:req.profile._id})
    .populate('user','_id name')
    .sort('-created')
    .exec((error,orders)=>{
        if(error)
        {
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(orders)
    })
}