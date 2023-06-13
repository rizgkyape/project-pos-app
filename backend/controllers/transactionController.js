const db = require('./../models');
const OrderDetail = db.OrderDetail;
const Order = db.Order;
const PaymentType = db.PaymentType;
const Product = db.Product;
const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports = {
	salesAggregate: async (req, res) => {
		try {
			let { startDate, endDate } = req.query;
			let where = {
				createdAt: { [Op.between]: [new Date('2023-06-01'), new Date('2023-08-30')] },
			};

			if (startDate && endDate) {
				where = {
					createdAt: { [Op.between]: [new Date(startDate), new Date(endDate)] },
				};
			}

			const result = await OrderDetail.findAll({
				attributes: [
					'createdAt',
					[sequelize.fn('sum', sequelize.col('total')), 'totalSales'],
				],
				where: where,
				group: ['createdAt'],
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
