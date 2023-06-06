const db = require("./../models");
const Product = db.Product;

module.exports = {
  productsList: async (req, res) => {
    try {
      const result = await Product.findAll({});

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
  filterProductByName: async (req, res) => {
    try {
      const { name } = req.query;

      const result = await Product.findAll({
        where: {
          name: { [Op.like]: `%${name}%` },
        },
      });

      console.log(result);

      if (result.length > 0) {
        res.status(200).send({
          success: true,
          message: "Search product by name success!",
          data: result,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Product not found!",
        });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },
};
