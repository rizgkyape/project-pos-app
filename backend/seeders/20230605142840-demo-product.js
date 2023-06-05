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

		await queryInterface.bulkInsert('products', [
			{
				categoryId: 1,
				name: 'Burger',
				price: 44000,
				stock: 45,
				expiredDate: '2023-05-20',
        imageLink: 'https://asset.kompas.com/crops/fP_Q5TD9BOn5G5JTnntgtDIjQMI=/53x36:933x623/750x500/data/photo/2021/10/21/6171492e1ea12.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				categoryId: 2,
				name: 'Milkshake',
				price: 30000,
				stock: 28,
				expiredDate: '2023-05-18',
        imageLink: 'https://marleysmenu.com/wp-content/uploads/2021/07/Butterscotch-Milkshake-Recipe-Card-Image.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				categoryId: 1,
				name: 'Ketoprak',
				price: 20000,
				stock: 30,
				expiredDate: '2023-05-10',
        imageLink: 'https://asset.kompas.com/crops/BiN_oCxCDgkO09b1B_FPfZuvGBw=/0x0:739x493/750x500/data/photo/2020/01/29/5e318845429db.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				categoryId: 2,
				name: 'Susu Kacang',
				price: 12000,
				stock: 50,
				expiredDate: '2023-05-07',
        imageLink: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1657254703/attached_image/manfaat-susu-kedelai-untuk-asam-lambung-dan-cara-membuatnya.jpg',
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
		await queryInterface.bulkDelete('products', null, {});
	},
};
