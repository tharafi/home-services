import createError from "../utils/createError.js"
import Service from "../models/service.model.js"
import Order from "../models/booking.model.js";

export const createOrder = async(req, res, next) => {
  try{
    const service = await Service.findById(req.params.serviceId);

    const newOrder = new Order ({
      serviceId: service._id,
      img: service.cover,
      title: service.title,
      buyerId: req.userId,
      sellerId: service.userId,
      price: service.price,
      payment_intent: "temporary"
    })

    await newOrder.save();
    res.status(200).send("successful")
  }catch(err) {
    next(err)
  }
}
export const getOrders = async(req, res, next) => {
  try{
    const orders = await Order.find({
      ...(req.isSeller ? {sellerId: req.userId}: {buyerId: req.userId}),
    });

    res.status(200).send(orders)
  }catch(err){
    next(err);
  }
}