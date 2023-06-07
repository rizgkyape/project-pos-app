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
  }
};
