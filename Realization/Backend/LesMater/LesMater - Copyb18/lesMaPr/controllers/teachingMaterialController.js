const TeachingMaterial = require('../models/teachingmaterial');



exports.getTeachingMaterials = (req, res, next) => {
  TeachingMaterial.fetchAll()
    .then(materials => {
      res.render('teaching-materials/teaching-material-list', {
        materials: materials,
        pageTitle: 'All Teaching Materials',
        path: '/teaching-materials'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getTeachingMaterial = (req, res, next) => {
  const materialId = req.params.materialId;

  TeachingMaterial.findById(materialId)
    .then(material => {
      res.render('teaching-materials/teaching-material-detail', {
        material: material,
        pageTitle: material.title,
        path: '/teaching-materials'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  TeachingMaterial.fetchAll()
    .then(materials => {
      res.render('teaching-materials/index', {
        materials: materials,
        pageTitle: 'Teaching Materials Platform',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};


