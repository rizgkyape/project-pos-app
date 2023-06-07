const db = require('./../models');
const Product = db.Product;
const ProductCategory = db.ProductCategory
const { Op } = require('sequelize');

module.exports = {
	productsList: async (req, res) => {
		try {
			let where = undefined;
      let order = undefined;
      //pagination
      let page = Number(req.query.page) || 0
      let limit = Number(req.query.limit) || 20
      // let orderBy = req.query.orderBy || "id"

      let { name, category, sortBy, sort } = req.query;
      category = Number(category)
			console.log(name, '1');
			console.log(Number(category), 'ini categoryyy');

			if (name) {
				where = {
					name: { [Op.like]: `%${name}%` },
				};
			}

			if (category) {
				if (name) {
					where['categoryId'] = category;
				} else {
					where = {
						categoryId: category,
					};
				}
			}

			if (sortBy && sort) {
				order = [[`${sortBy}`, `${sort}`]];
      }
      
      //pagination
      let dataCount = await Product.count({
        where: where
      })
      let pageCount = Math.ceil(dataCount / limit)

      console.log(where, 'iniii whare')

			let result = await Product.findAll({
				where: where,
				order: order,
        include: [{ model: db.ProductCategory }],
        limit: limit,
        offset: page * limit,
			});

			return res.status(200).send({
				success: true,
				message: 'fetch success',
        data: result,
        pagination: {
          page: page,
          pageCount: pageCount,
          dataCount: dataCount,
          limit: limit
        }
			});
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error.message,
				data: null,
			});
		}
  },
  getCategory: async (req, res) => {
    try {
      console.log('masuk')
      const result = await ProductCategory.findAll()

      res.status(200).send({
        success: true,
        message: "fetch success",
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
	create: async (req, res) => {
		try {
			const { categoryId, name, price, stock, expiredDate, imageLink } =
				req.body;

			const file = req.file;

			const result = await Product.create({
				categoryId,
				name,
				price,
				stock,
				expiredDate,
				imageLink: imageLink ? imageLink : '',
				image: file?.filename ? file?.filename : '',
			});

			if (result) {
				return res.status(201).send({
					success: true,
					message: 'Create product success!',
					data: result,
				});
			} else {
				return res.status(400).send({
					success: false,
					message: 'Create product failed',
					data: {},
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
	modify: async (req, res) => {
		try {
			const { id } = req.params;
			const { categoryId, name, price, stock, expiredDate, imageLink } =
				req.body;

			const file = req.file;

			const checkProduct = await Product.findOne({
				where: {
					id,
				},
			});

			console.log(checkProduct);

			if (!checkProduct) {
				return res.status(400).send({
					success: false,
					message: 'Product not found!',
					data: null,
				});
			} else {
				const result = await Product.update(
					{
						categoryId: categoryId ? categoryId : checkProduct.categoryId,
						name: name ? name : checkProduct.name,
						price: price ? price : checkProduct.price,
						stock: stock ? stock : checkProduct.stock,
						expiredDate: expiredDate ? expiredDate : checkProduct.expiredDate,
						imageLink: imageLink ? imageLink : '',
						image: file?.filename ? file?.filename : '',
					},
					{
						where: {
							id,
						},
					}
				);

				const resultUpdate = await Product.findOne({
					where: {
						id,
					},
				});

				return res.status(200).send({
					success: true,
					message: 'Fetch success!',
					data: resultUpdate,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: false,
				message: error,
				data: null,
			});
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.params;

			let checkProduct = await Product.findOne({
				where: {
					id,
				},
			});

			if (!checkProduct) {
				return res.status(400).send({
					success: false,
					message: 'Product not found!',
					data: null,
				});
			} else {
				let deleteProduct = await Product.destroy({
					where: {
						id,
					},
				});

				return res.status(200).send({
					success: true,
					message: 'Product deleted!',
					data: null,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: true,
				message: error.message,
				data: null,
			});
		}
	},
	createCategory: async (req, res) => {
		try {
			const { category } = req.body;

			const result = await ProductCategory.create({
				category,
			});

			if (result) {
				return res.status(201).send({
					success: true,
					message: 'Create product category success!',
					data: result,
				});
			} else {
				return res.status(400).send({
					success: true,
					message: 'Create product category failed!',
					data: null,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: true,
				message: error.message,
				data: null,
			});
		}
	},
	modifyCategory: async (req, res) => {
		try {
			const { id } = req.params;
			const { category } = req.body;

			let checkProduct = await ProductCategory.findOne({
				where: {
					id: id,
				},
			});

			if (!checkProduct) {
				return res.status(400).send({
					success: false,
					message: 'Product category not found!',
					data: null,
				});
			} else {
				const result = await ProductCategory.update(
					{
						category,
					},
					{
						where: {
							id: id,
						},
					}
				);

				const resultUpdate = await ProductCategory.findOne({
					where: {
						id: id,
					},
				});

				return res.status(200).send({
					success: true,
					message: 'Update product category success!',
					data: resultUpdate,
				});
			}
		} catch (error) {
			res.status(500).send({
				success: true,
				message: error.message,
				data: null,
			});
		}
	},
};
