"use strict";

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
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 1,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 2,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 3,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 4,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 5,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 6,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 7,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: 8,
          categoryId: 1,
          name: "Ice Cappucino",
          price: 20000,
          stock: 10,
          expiredDate: new Date,
          imageLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIhuy-MClmdGE4Ut9_zPjJgTFJ_peVTUbx331QQrcUP0a7l_gM6RBOrCOCP5bfgXRH50&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
