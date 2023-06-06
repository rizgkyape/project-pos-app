const db = require('./../models');
const Product = db.Product;
const { Op } = require('sequelize');

module.exports = {
	filterProductByName: async (req, res) => {
		try {
			const { name } = req.query;

			const result = await Product.findAll({
				where: {
					name: { [Op.like]: `%${name}%` },
				},
			});

			console.log(result);

			if (result.length > 0) {
				res.status(200).send({
					success: true,
					message: 'Search product by name success!',
					data: result,
				});
			} else {
				res.status(404).send({
					success: false,
					message: 'Product not found!',
				});
			}
		} catch (error) {
			res.status(400).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
	},
	filterProductByCategory: async (req, res) => {
		try {
			const { category } = req.query;

			const result = await Product.findAll({
				include: { model: db.ProductCategory },
				where: {
					category: category,
				},
			});

			console.log(result);
		} catch (error) {}
	},
};
