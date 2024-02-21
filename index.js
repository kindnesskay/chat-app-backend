import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import authRoutes from './routes/auth.routes.js'
const port=process.env.PORT
const app=express()
app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
res.json({message:"Hello world"})
})

app.use("/api/auth",authRoutes)

app.listen(port,()=>{
    console.log("running on port :",port);
})

