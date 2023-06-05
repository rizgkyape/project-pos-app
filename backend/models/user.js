'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			adminId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: 'email',
					msg: 'Email has already taken!',
				},
				validate: {
					isEmail: true,
				},
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: 'phoneNumber',
					msg: 'Phone number has already taken!',
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [8, 255],
						msg: 'Password length must contain more than 8 characters!',
					},
				},
			},
			isAdmin: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
