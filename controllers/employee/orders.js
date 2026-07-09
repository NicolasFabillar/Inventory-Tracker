
const { Products, ProductMovements, Users, Orders, OrderItems, Refunds} = require("../../models/Associations")
const errorHandler = require("../../util/errorHandler")
const parseQueryParams = require("../../util/parseQueryParams")
const { Op } = require("sequelize");

exports.createOrder = async (req, res, next) => {
  const { userId, userRole } = req
  const { customerName, orderItems} = req.body

  try {
    let totalAmount = 0;

    const products = await Promise.all(
        orderItems.map(async (order) => {
            const product = await Products.findOne({
                where: {
                    id: order.id,
                    quantity: {
                        [Op.gte]: order.quantity,
                    },
                },
            });

            if (!product) {
                errorHandler(`This product does not exist or has insufficient stock.`, 404, order);
            }

            const amount = product.price * order.quantity
            totalAmount += amount;

            return product;
        })
    );

    const createdOrder = await Orders.create(
        {
        employee_id: userId,
        customer_name: customerName,
        total_amount: totalAmount,
        status: "pending",

        orderItems: products.map((item, index) => ({
            product_id: item.id,
            quantity: orderItems[index].quantity,
            price_at_sale: item.price,
            subtotal: orderItems[index].quantity * item.price,
            status: "sold"
        })),
        },
        {
            include: [
            {
                model: OrderItems,
                as: "orderItems",
            },
            ],
        }
    )  

    await Promise.all(
        orderItems.map(async (order, index) => {
            await Products.decrement("quantity", {
                by: order.quantity,
                where: {
                    id: order.id
                }
            });

            await ProductMovements.create({
                product_id: order.id,
                change_quantity: order.quantity,
                quantity_after_change: products[index].quantity - order.quantity,
                reason: "sale",
                order_id: createdOrder.id,
                performed_by: userId,
            })
        })
    );

    return res.status(200).json({ status: true })
  } catch (err) {
    next(err)
  }
}

exports.payOrder = async (req, res, next) => {
  const { userId, userRole } = req
  let { paymentMethod, amountTendered} = req.body
  const { orderId } = req.params;

  try {
    const order = await Orders.findByPk(orderId);
    
    if (!order) {
        errorHandler(`Order not found`, 404);
    }

    if (order.payment_method) {
        errorHandler(`Order is already payed`, 409);
    }

    let changeDue;

    if (paymentMethod == "cash") {
        if (!amountTendered) {
            errorHandler(`If payment is cash, please add amount tendered`, 409);
        }

        if (amountTendered < order.total_amount) {
            errorHandler(`Insufficient payment`, 409);
        }
        changeDue = amountTendered - order.total_amount;
    } else {
        amountTendered = null;
    }

    order.update({
        payment_method: paymentMethod,
        amount_tendered: amountTendered,
        change_due: changeDue,
        status: "completed"
    })

    return res.status(200).json({ status: true, changeDue})
  } catch (err) {
    next(err)
  }
}

exports.refundOrder = async (req, res, next) => {
  const { userId, userRole } = req
  const { customerName, refundItems, refundReason} = req.body
  const { orderId } = req.params;

  try {
    const order = await Orders.findByPk(orderId);
    
    if (!order) {
        errorHandler(`Order not found`, 404);
    }

    if (order.customer_name != customerName) {
        errorHandler(`Incorrect customer name`, 403);
    }

    if (order.status != "completed") {
        errorHandler(`You can only initiate refund once per order`, 403);
    }

    let refundAmount = 0;

    const orderItems = await Promise.all(
        refundItems.map(async (item) => {
            const orderItem = await OrderItems.findOne({
                where: {
                    product_id: item.id,
                    order_id: orderId,
                    quantity: {
                    [Op.gte]: item.quantity,
                    },
                },
                include: [
                    {
                    model: Products,
                    as: "orderProduct",
                    attributes: ["id", "quantity"],
                    },
                ],
            });

            if (!orderItem) {
                errorHandler(`Order item not found, please check the product id and make sure that the quantity is less than the original order`, 404, item);
            }

            if (orderItem.status != "sold") {
                errorHandler(`You can only initiate refund once per order`, 403);
            }

            const amount = orderItem.price_at_sale * item.quantity
            refundAmount += amount;

            return orderItem;
        })
    );

    await Promise.all(
        orderItems.map(async (item, index) => {
            const refundItem = await Refunds.create({
                order_id: orderId,
                order_item_id: item.id,
                refunded_by: userId,
                refund_quantity: refundItems[index].quantity,
                refund_reason: refundReason,
                refunded_amount: item.price_at_sale * refundItems[index].quantity
            })

            const productMovement = await ProductMovements.create({
                product_id: item.product_id,
                change_quantity: refundItems[index].quantity,
                quantity_after_change: item.orderProduct.quantity + refundItems[index].quantity,
                reason: "sale",
                order_id: order.id,
                performed_by: userId,
            })

            await item.orderProduct.update({
                quantity: productMovement.quantity_after_change 
            })

            await item.update({
                status:
                    item.quantity > refundItems[index].quantity
                    ? "partially_refunded"
                    : "refunded",
                }
            );
        })
    );

    await order.update({
        status: refundAmount === order.total_amount
            ? "refunded"
            : "partially_refunded",
        }
    );

    return res.status(200).json({ status: true, refundAmount})
  } catch (err) {  
    next(err)
  }
}