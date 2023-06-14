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
				createdAt: {
					[Op.between]: [new Date('2023-06-01'), new Date('2023-08-30')],
				},
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
	createOrder: async (req, res) => {
		try {
			const { userId } = req.body;

			const checkOrder = await Order.findOne({
				where: {
					status: true,
				},
				order: [['createdAt', 'DESC']],
			});
			console.log(checkOrder.dataValues.status);
			if (checkOrder || checkOrder == null) {
				const createOrder = await Order.create({
					userId: userId,
					status: false,
				});

				return res.status(201).send({
					success: true,
					message: 'create order success',
					data: createOrder,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
	},
	createOrderDetail: async (req, res) => {
		try {
			const { productId, price } = req.body;
			const amount = 1;
			const total = amount * price;

			const getOrderId = await Order.findOne({
				where: {
					status: false,
				},
				order: [['createdAt', 'DESC']],
			});

			if (!getOrderId) {
				return res.status(400).send({
					success: false,
					message: 'Confirmation New Order',
					data: null,
				});
			}

			const check = await OrderDetail.findOne({
				where: {
					orderId: getOrderId.dataValues.id,
					productId: productId,
				},
			});

			if (check) {
				const result = await OrderDetail.update(
					{
						amount: check.dataValues.amount + 1,
						total: (check.dataValues.amount + 1) * price,
					},
					{
						where: {
							orderId: getOrderId.dataValues.id,
							productId: productId,
						},
					}
				);

				return res.status(200).send({
					success: true,
					message: 'Update Quantity Success',
					data: result,
				});
			} else {
				const result = await OrderDetail.create({
					orderId: getOrderId.dataValues.id,
					productId: productId,
					amount: 1,
					price: price,
					total: total,
				});

				return res.status(200).send({
					success: true,
					message: 'Add Product Success',
					data: result,
				});
			}

			// const result = await OrderDetail.create({
			// 	orderId: orderId,
			// 	productId: productId,
			// 	amount: amount,
			// 	price: price,
			// 	total: total
			// })

			// const checkDetail = await OrderDetail.findOne({
			// 	where: {
			// 		orderId: orderId,
			// 		productId: productId
			// 	}
			// })

			// if (checkDetail) {

			// }

			// if (result) {
			// 	 res.status(201).send({
			// 		success: true,
			// 		message: "create order detail Success",
			// 		data: result
			// 	})
			// } else {
			// 	return res.status(400).send({
			// 		success: true,
			// 		message: "create order detail failed",
			// 		data: {}
			// 	})
			// }
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
	},
	reduceProduct: async (req, res) => {
		try {
			const { id, amount, userId, price } = req.body;

			if (amount == 1) {
				const result = await OrderDetail.destroy({
					where: {
						id: id,
					},
				});

				return res.status(200).send({
					success: true,
					message: 'Product deleted',
					data: result,
				});
			}

			const tes = await OrderDetail.findAll({
				include: [
					{ model: db.Order, where: { status: false } },
					{ model: db.Product },
				],
			});
			const result = await OrderDetail.update(
				{
					amount: amount - 1,
					total: (amount - 1) * price,
				},
				{
					where: {
						id: id,
					},
				}
			);
			console.log('tess niii =>>>', tes);
			if (!tes.length) {
				await Order.destroy({
					where: {
						userId: userId,
						status: false,
					},
				});
			}
			// console.log("dehvfluejhvflehjrvfehjrfeq", tes.length)

			if (result) {
				return res.status(200).send({
					success: true,
					message: 'Update Quantity Success',
					data: result,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
	},
	onCharge: async (req, res) => {
		try {
			const { userId } = req.body;

			const result = await Order.update(
				{
					status: true,
				},
				{
					where: {
						userId: userId,
						status: false,
					},
				}
			);

			if (result) {
				return res.status(200).send({
					success: true,
					message: 'Your payment is successful!',
					data: result,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
	},
	getAllOrderList: async (req, res) => {
		try {
			const result = await OrderDetail.findAll({
				include: [
					{ model: db.Order, where: { status: false } },
					{ model: db.Product },
				],
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
	checkStatusOrder: async (req, res) => {
		try {
			const result = await Order.findOne({
				where: {
					status: false,
				},
				order: [['createdAt', 'DESC']],
			});

			if (result) {
				return res.status(200).send({
					success: true,
					message: 'Fetch data success!',
					data: result,
				});
			} else {
				return res.status(200).send({
					success: false,
					message: 'No data!',
					data: null,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
	},
};
