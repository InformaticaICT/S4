const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');
console.log(adminController);
const router = express.Router();


router.get('/add-teaching-material', adminController.getAddTeachingMaterial); 
router.post('/add-teaching-material', adminController.postAddTeachingMaterial);
router.get('/teaching-material-list', adminController.getTeachingMaterials); 


module.exports = router;
