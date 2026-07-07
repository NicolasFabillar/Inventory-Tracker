const { Op } = require("sequelize");

function parseQueryParams(req, allowedSortBy = ["createdAt"], searchFields = ["name"]) {
    let { page = 1, limit = 10, sortBy = "createdAt", order = "ASC", search } = req.query;

    if (!allowedSortBy.includes(sortBy)) {
        sortBy = "createdAt";
    }

    order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = { status: req.query.status || true };

    if (search) {
        where[Op.or] = searchFields.map(field => ({
            [field]: { [Op.like]: `%${search}%` }
        }));
    }

    return { where, limit: parseInt(limit), offset, order: [[sortBy, order]] };
}

module.exports = parseQueryParams;
