const db = require('./../models');
const OrderDetail = db.OrderDetail;
const Order = db.Order;
const PaymentType = db.PaymentType;
const Product = db.Product;
const { Op } = require('sequelize');

module.exports = {
	getAllTransaction: async (req, res) => {
		try {
			let { startDate, endDate } = req.query;
			let where = undefined;

			if (startDate && endDate) {
				where = {
					createdAt: { [Op.between]: [new Date(startDate), new Date(endDate)] },
				};
			}

			const result = await OrderDetail.findAll({
				include: [{ model: db.Order }, { model: db.Product }],
				where: where,
			});

			return res.status(200).send({
				success: true,
				message: 'Fetch data success!',
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
	salesAggregate: async (req, res) => {
		try {
			const result = await OrderDetail.sum('price', {
				include: [{ model: db.Order }, { model: db.Product }],
			});

			return res.status(200).send({
				success: true,
				message: 'Fetch data success!',
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
