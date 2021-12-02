const express = require('express');
const router = express.Router();

const {create,
    productById,
    read,
    remove,
    list,
    update,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch}
     = require('../controllers/product');
const {requireSignIn,isAdmin,isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user')

router.get('/product/:productId',read);
router.post('/product/create/:userId',
    requireSignIn,
    isAdmin,
    isAuth,
    create);

router.delete('/product/:productId/:userId',
    requireSignIn,
    isAdmin,
    isAuth,
    remove);

router.put('/product/:productId/:userId',
    requireSignIn,
    isAdmin,
    isAuth,
    update);

router.get('/products',list);
router.get('/products/search',listSearch); // search through input tab
router.get('/products/categories',listCategories);
router.get('/products/related/:productId',listRelated);
router.post('/products/by/search',listBySearch);
router.get('/products/photo/:productId',photo);
 
router.param("userId",userById);    
router.param("productId",productById);    
module.exports = router;