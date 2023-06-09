'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.ProductCategory, {
				foreignKey: 'categoryId',
			});

			Product.hasMany(models.OrderDetail, {
				foreignKey: 'productId'
			})
		}
	}
	Product.init(
		{
			categoryId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			price: DataTypes.INTEGER,
			stock: DataTypes.INTEGER,
			expiredDate: DataTypes.DATE,
			imageLink: DataTypes.STRING,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Product',
		}
	);
	return Product;
};
