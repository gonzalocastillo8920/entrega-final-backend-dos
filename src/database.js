import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gonzalocastillo8920:kakaroto@cluster0.m1vcq.mongodb.net/Backend2?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Base de datos conectada con exito!"))
    .catch((error) => console.log("Error en DB:" + error));