const { Products, ProductMovements, Users} = require("../../models/Associations")
const errorHandler = require("../../util/errorHandler")
const parseQueryParams = require("../../util/parseQueryParams")
const { Op } = require("sequelize");

// Find all the changes in a specific product history
exports.findProductMovementHistory = async (req, res, next) => {
    const { productId } = req.params;
    const { userId, userRole } = req;
    try {
        const { where, limit, offset, order } = parseQueryParams(
            req,
            ["createdAt", "change_amount"],
            ["reason"],
        )

        const productMovements = await ProductMovements.findAll({
            where: {
                ...where,
                product_id: productId
            },
            limit,
            offset,
            order,
            include: [
                {
                    model: Users,
                    as: 'performedBy',
                    attributes: ["id", "first_name", "last_name"]
                },
                {
                    model: Products,
                    as: 'changedProduct',
                    attributes: ["id", "name"]
                },

            ],
            attributes: ["id", "change_quantity", "quantity_after_change", "reason", "description","createdAt"],
        })

        return res.status(200).json({ status: true, productMovements })
    } catch (err) {
        next(err)
    }
}
