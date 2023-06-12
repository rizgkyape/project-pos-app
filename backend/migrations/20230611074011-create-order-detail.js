'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('OrderDetails', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			orderId: {
				type: Sequelize.INTEGER,
			},
			productId: {
				type: Sequelize.INTEGER,
			},
			amount: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			total: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATEONLY,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATEONLY,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('OrderDetails');
	},
};
