import  express  from 'express';
import { addTocart ,getCart,removeFromCart,addToCartFromLocalstorage} from '../controllers/cartController.js';
import authMiddleware from './../middleware/auth.js';
const cartRoute=express.Router();

cartRoute.get("/",authMiddleware,getCart)
cartRoute.post("/add",authMiddleware,addTocart)
cartRoute.patch('/remove',authMiddleware,removeFromCart)
cartRoute.patch('/addCart',authMiddleware,addToCartFromLocalstorage)
export default cartRoute;