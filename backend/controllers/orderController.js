import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

//@desc    Create new Order
//@route   POST  /api/orders
//@access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itamsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(401)
    throw new Error("no order items")
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itamsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc      Get order by ID
// @route     GET /api/orders/:id
// @access    Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export { addOrderItems, getOrderById }
