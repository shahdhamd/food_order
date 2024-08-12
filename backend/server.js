import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// app config
const app = express();
const port = 4000;

// middleware

app.use(express.json())
app.use(cors())

// db connection
connectDB()


// api endpoints
app.use("/api/v1/food", foodRouter)
app.use('/images', express.static('uploads'))
app.use("/api/v1/user", userRouter)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/order", orderRoute)


app.get("/", (req, res) => {
    res.send("api working")
})
app.get("*", (req, res) => {
    res.send("error")
})


app.listen(port, () => {
    console.log(`server running ${port}`)
})

///npm run server