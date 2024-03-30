const express=require('express');
const cors=require('cors');
const bodyParser = require('body-parser')
const sequelize = require('./utils/database');
const controller=require('./controllers/expense')

const app=express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));


app.get('/',controller.getDetails);
app.post('/',controller.postDetails)
app.delete('/:id',controller.deleteDetails)
app.put('/:id',controller.editDetails)

sequelize.sync()
    .then(()=>{
        app.listen(3000)
    })