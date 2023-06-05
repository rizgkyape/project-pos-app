'use strict';

// const { now } = require('sequelize/types/utils');

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
		await queryInterface.bulkInsert('users', [
			{
				adminId: 0,
				name: 'Rizky Ananda',
				email: 'rizkyananda@gmail.com',
				phoneNumber: '081234567890',
				password: 'Tes12345678',
				isAdmin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				adminId: 1,
				name: 'Muhammad Naufal',
				email: 'mnaufal@gmail.com',
				phoneNumber: '081209876543',
				password: 'Tes12345678',
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date(),
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
		await queryInterface.bulkDelete('users', null, {});
	},
};
