const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense','root','Pramod@21',{
    dialect:"mysql",
    host:"localhost"
});

module.exports=sequelize
