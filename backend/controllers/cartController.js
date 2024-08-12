import userModel from "../models/userModel.js";

// Add items to user cart
const addTocart = async (req, res) => {
    try {
        const { itemId } = req.body;
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const addToCartFromLocalstorage = async (req, res) => {
    try {
        const { cartData } = req.body;
        let userData = await userModel.findOne({ _id: req.body.userId });

        if (!userData) {
            return res.json({ success: false, message: 'يجب تسجيل الدخول' });
        }

        // Merge local storage cart data with existing cart data
        let existingCartData = userData.cartData || {};
        for (let itemId in cartData) {
            // if (existingCartData[itemId]) {
            //     existingCartData[itemId] += cartData[itemId];
            // } else {
            //     existingCartData[itemId] = cartData[itemId];
            // }
            existingCartData[itemId] = cartData[itemId];

        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: existingCartData });
        res.json({ success: true, message: "Cart updated from local storage" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData || {};
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: 'Removed success' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Get user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { removeFromCart, getCart, addTocart, addToCartFromLocalstorage };
