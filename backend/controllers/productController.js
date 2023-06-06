const db = require('./../models');
const Product = db.Product;
const { Op } = require('sequelize');

module.exports = {
	productsList: async (req, res) => {
		try {
			let where = undefined;
			let order = undefined;
			const { name, category, sortBy, sort } = req.query;
			console.log(name);
			console.log(category);

			if (name) {
				where = {
					name: { [Op.like]: `%${name}%` },
				};
			}

			if (category) {
				if (name) {
					where['categoryId'] = category;
				} else {
					where = {
						categoryId: category,
					};
				}
			}

			if (sortBy && sort) {
				order = [[`${sortBy}`, `${sort}`]];
			}

			let result = await Product.findAll({
				where: where,
				order: order,
				include: [{ model: db.ProductCategory }],
			});

			return res.status(200).send({
				success: true,
				message: 'fetch success',
				data: result,
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
	},
};
