const express = require('express');
const router = express.Router();

const {requireSignIn,isAuth,isAdmin} = require('../controllers/auth');
const {userById,addOrderToUserHistory} = require('../controllers/user');
const {create,
       listOrders,
       getStatusValues,
       orderById,
       updateOrderStatus} = require('../controllers/order');
const {decreaseQuantity} = require('../controllers/product')

router.post('/order/create/:userId',
    requireSignIn,
    isAuth, 
    addOrderToUserHistory,
    decreaseQuantity,
    create);

router.get('/order/list/:userId',requireSignIn,isAdmin,isAuth,listOrders);
router.get('/order/status-values/:userId',requireSignIn,isAdmin,isAuth,getStatusValues);
router.put('/order/:orderId/status/:userId',
            requireSignIn,
            isAdmin,
            isAuth,
            updateOrderStatus);


router.param('userId',userById)
router.param('orderId',orderById)

module.exports = router