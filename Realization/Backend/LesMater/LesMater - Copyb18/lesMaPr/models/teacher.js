const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;



class Teacher {
  constructor(username, email, id) {
    this.name = username;
    this.email = email;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('teachers').insertOne(this);
  }




  static findById(teacherId) {
    const db = getDb();
    return db
      .collection('teachers')
      .findOne({ _id: new ObjectId(teacherId) })
      .then(teacher => {
        console.log(teacher);
        return teacher;
      })


      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Teacher;


