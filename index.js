const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");

const app = express();

app.use(express.json());
app.use('/auth', authRouter)

const start = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://superuser:qwerty123@cluster0.ab3xp80.mongodb.net/`);

        app.listen(3000, () => {
            console.log("SERVER RUN. PORT: 3000");
          });
    } catch (error) {
        console.log(error);
    }
}

start();