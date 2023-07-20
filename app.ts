import express, { Application } from "express";
import { invoke } from "./src/routes/index";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app: Application = express()
const port = process.env.PORT || 3000;

function middlewares() {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
}

function connectMongDb() {
    // mongoose.connect('mongodb+srv://maeceloacm1998:Vayne123@cluster0.k8a87tc.mongodb.net/');
    mongoose
        .connect(process.env.MONGODB_URI!!, {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        })
        .then(() => {
            console.log('Mongodb connected....');
        })
        .catch(err => console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });
}

middlewares()
connectMongDb()
app.use(invoke())

app.listen(port, () => {
    console.log(`Server iniciado na porta ${port}`)
})
