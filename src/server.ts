import { error } from "console";
import { AppDataSource } from "./database/data-source";
import express, { Application } from "express"

const app: Application = express();

AppDataSource.initialize().then(()=>{
    app.listen(3000, () => {
        console.log("Servidor rodando 🚀")
        console.log("Porta: localhost:3000")
    })
}).catch((error) => {
    console.error(error)
})
