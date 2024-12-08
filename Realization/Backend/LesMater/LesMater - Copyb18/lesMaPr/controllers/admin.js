const TeachingMaterial = require('../models/teachingmaterial');


exports.postEditTeachingMaterial = (req, res, next) => {
  const teachingMaterial = new TeachingMaterial(
    req.body.title,
    req.body.level,
    req.body.duration,
    req.body.domain,
    req.body.purpose,
    req.body.preparation,
    req.body.structure,
    req.body.activities,
    req.body.theoreticalBasis,
    req.body.imageUrl,
    req.body.price,
    req.body.description,
    req.body.materialId,
    req.user._id
  );



  teachingMaterial
    .save()
    .then(result => {
      console.log('UPDATED teaching material!');
      res.redirect('/admin/teaching-materials');
    })
    .catch(err => {
      console.log(err);
    });
};


exports.postAddTeachingMaterial = (req, res, next) => {
  const {
    title, level, duration, domain, purpose, preparation,
    structure, activities, theoreticalBasis,
    imageUrl, price, description
  } = req.body;





  const teachingMaterial = new TeachingMaterial(
    title,
    level,
    duration,
    domain,
    purpose,
    preparation,
    structure,
    activities,
    theoreticalBasis,
    imageUrl,
    price,
    description,
    null,
    req.teacher._id
  );

  teachingMaterial
    .save()
    .then(result => {
      console.log('Teaching Material Added');
      res.redirect('/admin/teaching-materials');
    })
    .catch(err => {
      console.log(err);
    });
};



exports.getTeachingMaterials = (req, res, next) => {
  TeachingMaterial.fetchAll()
    .then(materials => {
      console.log('Teaching Materials:', materials); // Debug output
      res.render('admin/teaching-material-list', {

        materials: materials, // stuur data naar de ESJ template 
        pageTitle: 'Teaching Materials',
        path: '/admin/teaching-materials'
      });
    })
    .catch(err => {
      console.log('Error fetching teaching materials:', err);
    });
};







exports.getAddTeachingMaterial = (req, res, next) => {
  res.render('admin/edit-teaching-material', {
    pageTitle: 'Add Teaching Material',
    path: '/admin/add-teaching-material',
    editing: false
  });
};


exports.getEditTeachingMaterial = (req, res, next) => {
  const materialId = req.params.materialId; // Haal het ID van de URL op
  TeachingMaterial.findById(materialId)
    .then(material => {
      if (!material) {
        return res.redirect('/admin/teaching-materials');
      }
      res.render('admin/edit-teaching-material', {
        pageTitle: 'Edit Teaching Material',
        path: '/admin/edit-teaching-material',
        editing: true,
        material: material
      });
    })
    .catch(err => console.log(err));
};