const db = require('./../models');
const User = db.User;
// const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = {
	loginAdmin: async (req, res) => {
		try {
			const { emailOrPhone, password } = req.body;

			let result;

			if (emailOrPhone.includes('@')) {
				result = await User.findOne({
					where: {
						email: emailOrPhone,
						password: password,
						isAdmin: true,
					},
				});
			} else {
				result = await User.findOne({
					where: {
						phoneNumber: emailOrPhone,
						password: password,
						isAdmin: true,
					},
				});
			}

			if (result) {
				let payload = {
					id: result.id,
					adminId: result.adminId,
					name: result.name,
					isAdmin: result.isAdmin,
				};

				const token = jwt.sign(payload, 'coding-its-easy');

				return res.status(200).send({
					success: true,
					message: 'Login Success',
					data: {
						id: result.id,
						adminId: result.adminId,
						name: result.name,
						isAdmin: result.isAdmin,
						token,
					},
				});
			} else {
				return res.status(404).send({
					success: false,
					message: 'Wrong email/phone number or password!',
					data: {},
				});
			}
		} catch (error) {
			res.status(400).send({
				success: false,
				message: error.message,
				data: {},
			});
		}
	},
	loginCashier: async (req, res) => {
		try {
			const { emailOrPhone, password } = req.body;

			let result;

			if (emailOrPhone.includes('@')) {
				result = await User.findOne({
					where: {
						email: emailOrPhone,
						password: password,
						isAdmin: false,
					},
				});
			} else {
				result = await User.findOne({
					where: {
						phoneNumber: emailOrPhone,
						password: password,
						isAdmin: false,
					},
				});
			}

			if (result) {
				let payload = {
					id: result.id,
					adminId: result.adminId,
					name: result.name,
					isAdmin: result.isAdmin,
				};

				const token = jwt.sign(payload, 'coding-its-easy');

				return res.status(200).send({
					success: true,
					message: 'Login Success',
					data: {
						id: result.id,
						adminId: result.adminId,
						name: result.name,
						isAdmin: result.isAdmin,
						token,
					},
				});
			} else {
				return res.status(404).send({
					success: false,
					message: 'Wrong email/phone number or password!',
					data: {},
				});
			}
		} catch (error) {
			res.status(400).send({
				success: false,
				message: error.message,
				data: {},
			});
		}
	},
};
