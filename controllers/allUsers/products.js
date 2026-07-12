const { Products, Categories, ProductMovements, Users} = require("../../models/Associations")
const errorHandler = require("../../util/errorHandler")
const parseQueryParams = require("../../util/parseQueryParams")
const { Op } = require("sequelize");

// Find all Products that are active or inactive
exports.findAllProducts = async (req, res, next) => {
  try {
    const { where, limit, offset, order } = parseQueryParams(
      req,
      ["name", "quantity"],
      ["name"]
    )

    const allProducts = await Products.findAll({
      where: {
        ...where,
        status: req.query.status || true
      },
      limit,
      offset,
      order,
      include: [
        {
            model: Categories,
            as: 'category',
            attributes: ["id", "name"]
        }
      ],
      attributes: ["id", "name", "sku", "description", "quantity", "low_stock_threshold", "price"],
    })

    return res.status(200).json({ status: true, allProducts })
  } catch (err) {
    next(err)
  }
}

exports.findProductById = async (req, res, next) => {
  const { productId } = req.params

  try {
    const product = await Products.findOne({
      where: {
        id: productId,
      },
      include: [
        {
            model: Categories,
            as: 'category',
            attributes: ["id", "name"]
        }
      ],
      attributes: ["id", "name", "sku", "description", "quantity", "low_stock_threshold", "price"],
    })

    if (!product) {
      errorHandler("Product not found", 404)
    }

    return res.status(200).json({ status: true, product })
  } catch (err) {
    next(err)
  }
}

exports.findProductBySKU = async (req, res, next) => {
  const { sku } = req.params

  try {
    const product = await Products.findOne({
      where: {
        sku: sku,
      },
      include: [
        {
            model: Categories,
            as: 'category',
            attributes: ["id", "name"]
        }
      ],
      attributes: ["id", "name", "sku", "description", "quantity", "low_stock_threshold", "price"],
    })

    if (!product) {
      errorHandler("Product sku not found", 404)
    }

    return res.status(200).json({ status: true, product })
  } catch (err) {
    next(err)
  }
}