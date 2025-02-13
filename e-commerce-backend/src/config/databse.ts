import { Sequelize } from "sequelize";

export const sequelize=new Sequelize('eCommerce','sagarika','Sagarika@%71',{
    host:'localhost',
    dialect:'mysql'
});

try{
    sequelize.authenticate();
    console.log('Conncection has been established successfully.');
}
catch(error){
    console.log("Error connecting databse:",error);
}

sequelize.sync().then((data)=>{
    console.log("databse synced successfully.");
}).catch((error)=>{
    console.log("Error syncing databse:",error);
})