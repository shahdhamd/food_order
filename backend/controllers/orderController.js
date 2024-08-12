import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET)
///  placing user order for frontend

const placeOrder = async (req, res) => {
    console.log(req.body);
    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        }) // اخزن في متغير

        await newOrder.save();   /// احفظ في داتا بيس
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); // امسح الكارت تبع اليوزر

        // const line_items = req.body.items.map((item) => ({
        //     price_data: {
        //         currency: "inr",
        //         product_data: {
        //             name: item.name
        //         },
        //         unit_amount: item.price * 100 * 80
        //     },
        //     quantity: item.quantity

        // }))
        // line_items.push({
        //     price_data: {
        //         currency: "inr",
        //         product_data: {
        //             name: "Delivery Charges"
        //         },
        //         unit_amount: 2 * 100 * 80
        //     },
        //     quantity: 1
        // })

        // const session = await stripe.Checkout.session.create({
        //     line_items: line_items,
        //     mode: 'payment',
        //     success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        // })

        res.json({ success: true, message: 'success add order' })
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: 'Error' })
    }
}


// all order list 
const listOrder = async (req, res) => {
    try {
        const find = await orderModel.find({})
        res.json({ success: true, data: find })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}
export { placeOrder,listOrder }