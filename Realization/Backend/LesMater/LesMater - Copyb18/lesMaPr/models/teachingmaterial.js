const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class TeachingMaterial {
    constructor(title, level, duration, domain, purpose, preparation, structure, activities, theoreticalBasis, imageUrl, price, description, id, userId) {
        this.title = title;
        this.level = level;
        this.duration = duration;
        this.domain = domain;
        this.purpose = purpose;
        this.preparation = preparation;
        this.structure = structure;
        this.activities = activities;
        this.theoreticalBasis = theoreticalBasis;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }


    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update existing teaching material 
            dbOp = db
                .collection('teaching_materials')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            // insert new teaching material
            dbOp = db.collection('teaching_materials').insertOne(this);

        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('teaching_materials')
            .find()
            .toArray()
            .then(teachingMaterials => {
                console.log(teachingMaterials);
                return teachingMaterials;
            })
            .catch(err => {
                console.log(err);
            });
    }


    static findById(prodId) {
        const db = getDb();
        return db
            .collection('teaching_materials')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(teachingMaterial => {
                console.log(teachingMaterial);
                return teachingMaterial;
            })
            .catch(err => {
                console.log(err);
            });
    }


    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('teaching_material')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = TeachingMaterial;
