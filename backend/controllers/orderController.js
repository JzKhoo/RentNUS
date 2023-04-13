import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else if (user) {
    try {
      const order = new Order({
        orderItems,
        user: user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      for (const item of orderItems) {
        await Item.updateOne({ _id: item.item }, { isOrderPlaced: true });
      } // get item and set isorderplaced to be true.

      res.status(201).json(createdOrder);
      console.log("Successfully created Order!");
    } catch (error) {
      console.log(error);
    }
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  // .populate(
  //   "user",
  //   "name email" // get name and email of a user tagged to order
  // );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    createdAt,
    updatedAt,
    paidAt,
    paymentResult
  } = req.body;

  // const userObjectId = new mongoose.Types.ObjectId(user);

  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        orderItems: orderItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        isPaid: isPaid,
        createdAt: createdAt,
        updatedAt: updatedAt,
        paidAt: paidAt,
        paymentResult: paymentResult,
      },
    },
    { new: true }
  );

  if (updatedOrder) {
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
  // const order = await Order.findById(req.params.orderId);  
  // console.log("order: "+ order.orderItems);

  // const updatedOrder = await Order.updateOne(
  //   { _id: req.params.orderId},
  //   {
  //     $set: {
  //       "orderItems.$.isBorrowed": isBorrowed,
  //     },
  //   },
  // );

  // console.log("Updated order: "+ updatedOrder.orderItems);

  // if (updatedOrder) {
  //   res.json(updatedOrder);
  // } else {
  //   res.status(404);
  //   throw new Error("Item not found");
  // }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    // payment result is from paypal

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyItemOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ 'orderItems.owner': req.params.userId });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrder,
  getMyItemOrders,
};
