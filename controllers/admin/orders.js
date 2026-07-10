
const { Products, ProductMovements, Users, Orders, OrderItems, Refunds} = require("../../models/Associations")
const errorHandler = require("../../util/errorHandler")
const parseQueryParams = require("../../util/parseQueryParams")
const { Op } = require("sequelize");

exports.approveRefund = async (req, res, next) => {
  const { userId, userRole } = req
  const { status} = req.body
  const { orderId } = req.params;

  try {
    if (userRole != "Admin") {
        errorHandler("User is not an admin", 403)
    }

    const order = await Orders.findByPk(orderId);
    
    if (!order) {
        errorHandler(`Order not found`, 404);
    }

    const refundItems = await Refunds.findAll({
        where: {
            order_id: orderId, 
        }
    })

    if (!refundItems) {
        errorHandler(`Initiate a refund first`, 403);
    }

    if (refundItems[0].status != "pending") {
        errorHandler(`A refund was already intiated before`, 409);
    }

    let refundAmount;

    if (status == "approved"){
        await Promise.all(refundItems.map(async (item, index) => {
            const orderItem = await OrderItems.findOne({
                where: {
                    id: item.order_item_id,
                },
                include: [
                    {
                    model: Products,
                    as: "orderProduct",
                    attributes: ["id", "quantity"],
                    },
                ],
            })

            const productMovement = await ProductMovements.create({
                product_id: orderItem.product_id,
                change_quantity: item.refund_quantity,
                quantity_after_change: orderItem.orderProduct.quantity + item.refund_quantity,
                reason: "refund",
                order_id: orderId,
                refund_id: item.id,
                performed_by: refundItems[0].refunded_by,
                description: item.refund_reason
            })

            await orderItem.orderProduct.update({
                quantity: productMovement.quantity_after_change 
            })

            await orderItem.update({
                status:
                    orderItem.quantity > item.refund_quantity
                    ? "partially_refunded"
                    : "refunded",
                }
            );
        })
    );

    refundAmount = await Refunds.sum("refunded_amount", {
        where: { 
            order_id: orderId,
            status: ["approved", "pending"]
        }
    });

    await order.update({
        status: refundAmount === order.total_amount
            ? "refunded"
            : "partially_refunded",
        }
    );
    }

    await Promise.all(
        refundItems.map((refund) =>
            refund.update({
            status: "approved",
            })
        )
    );

    return res.status(200).json({ status: true, refundAmount})
  } catch (err) {
    next(err)
  }
}