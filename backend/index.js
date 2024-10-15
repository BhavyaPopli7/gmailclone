const express = require("express");
const app = express();
const database = require("./db/connectDB");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/user");
const emailRoute = require("./routes/email")
dotenv.config({});
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"I am coming from backend",
        success:true,
    })
})

//database connect
database.connect();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://gmailclone-ilxa.onrender.com',
    credentials: true
}
app.use(cors(corsOptions));

//Routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/email", emailRoute)
//http://localhost:4000/api/v1/user/signup

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});
