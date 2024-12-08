const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const Teacher = require('./models/teacher');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');

const teachingMaterialRoutes = require('./routes/teaching-materials');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  Teacher.findById("673f4e9ce7fcc615cee69016")

    .then(teacher => {
      req.teacher = new Teacher(teacher.userName, teacher.email, teacher._id);
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(teachingMaterialRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

