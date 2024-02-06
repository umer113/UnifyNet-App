import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';


dotenv.config({
    path:"./.env"
})

const PORT =process.env.PORT || 7200
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is connected at ${PORT}`)
    })

    app.on('error', (error) => {
        console.log(`Error with connected with server: ${error}`);
    });
})
.catch((error)=>{
    console.log("error in database: ",error)
})