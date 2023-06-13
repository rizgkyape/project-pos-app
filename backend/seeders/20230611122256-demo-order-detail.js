'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert('orderdetails', [
			{
				orderId: 1,
				productId: 17,
				amount: 1,
				price: 23000,
				total: 23000,
				createdAt: new Date('2023-06-11'),
				updatedAt: new Date('2023-06-11'),
			},
			{
				orderId: 1,
				productId: 18,
				amount: 1,
				price: 30000,
				total: 30000,
				createdAt: new Date('2023-06-11'),
				updatedAt: new Date('2023-06-11'),
			},
			{
				orderId: 2,
				productId: 19,
				amount: 2,
				price: 20000,
				total: 40000,
				createdAt: new Date('2023-06-12'),
				updatedAt: new Date('2023-06-12'),
			},
			{
				orderId: 2,
				productId: 20,
				amount: 1,
				price: 12000,
				total: 12000,
				createdAt: new Date('2023-06-12'),
				updatedAt: new Date('2023-06-12'),
			},
			{
				orderId: 3,
				productId: 17,
				amount: 1,
				price: 23000,
				total: 23000,
				createdAt: new Date('2023-06-13'),
				updatedAt: new Date('2023-06-13'),
			},
			{
				orderId: 3,
				productId: 19,
				amount: 1,
				price: 20000,
				total: 20000,
				createdAt: new Date('2023-06-13'),
				updatedAt: new Date('2023-06-13'),
			},
			{
				orderId: 1,
				productId: 17,
				amount: 1,
				price: 23000,
				total: 23000,
				createdAt: new Date('2023-07-11'),
				updatedAt: new Date('2023-07-11'),
			},
			{
				orderId: 1,
				productId: 18,
				amount: 1,
				price: 30000,
				total: 30000,
				createdAt: new Date('2023-07-11'),
				updatedAt: new Date('2023-07-11'),
			},
			{
				orderId: 2,
				productId: 19,
				amount: 2,
				price: 20000,
				total: 40000,
				createdAt: new Date('2023-07-12'),
				updatedAt: new Date('2023-07-12'),
			},
			{
				orderId: 2,
				productId: 20,
				amount: 1,
				price: 12000,
				total: 12000,
				createdAt: new Date('2023-07-12'),
				updatedAt: new Date('2023-07-12'),
			},
			{
				orderId: 3,
				productId: 17,
				amount: 1,
				price: 23000,
				total: 23000,
				createdAt: new Date('2023-07-13'),
				updatedAt: new Date('2023-07-13'),
			},
			{
				orderId: 3,
				productId: 19,
				amount: 1,
				price: 20000,
				total: 20000,
				createdAt: new Date('2023-07-13'),
				updatedAt: new Date('2023-07-13'),
			},
			{
				orderId: 1,
				productId: 17,
				amount: 1,
				price: 23000,
				total: 23000,
				createdAt: new Date('2023-08-11'),
				updatedAt: new Date('2023-08-11'),
			},
			{
				orderId: 1,
				productId: 18,
				amount: 1,
				price: 30000,
				total: 30000,
				createdAt: new Date('2023-08-11'),
				updatedAt: new Date('2023-08-11'),
			},
			{
				orderId: 2,
				productId: 19,
				amount: 2,
				price: 20000,
				total: 40000,
				createdAt: new Date('2023-08-12'),
				updatedAt: new Date('2023-08-12'),
			},
			{
				orderId: 2,
				productId: 20,
				amount: 1,
				price: 12000,
				total: 12000,
				createdAt: new Date('2023-08-12'),
				updatedAt: new Date('2023-08-12'),
			},
			{
				orderId: 3,
				productId: 17,
				amount: 1,
				price: 23000,
				total: 23000,
				createdAt: new Date('2023-08-13'),
				updatedAt: new Date('2023-08-13'),
			},
			{
				orderId: 3,
				productId: 19,
				amount: 1,
				price: 20000,
				total: 20000,
				createdAt: new Date('2023-08-13'),
				updatedAt: new Date('2023-08-13'),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('orderdetails', null, {});
	},
};
