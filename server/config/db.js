import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
});

connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Conexion a bd correcta");
        
    }
})

export default connection;