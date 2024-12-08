const express = require('express');
const teachingMaterialController = require('../controllers/teachingMaterialController');

const router = express.Router();

router.get('/teaching-materials', teachingMaterialController.getTeachingMaterials);

router.get('/teaching-materials/:materialId', teachingMaterialController.getTeachingMaterial);

router.get('/', teachingMaterialController.getIndex); 

module.exports = router;

