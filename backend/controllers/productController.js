const db = require('./../models');
const Product = db.Product;

module.exports = {
    productsList: async (req, res) => {
        try {
            const result = await Product.findAll({
            })

            res.status(200).send({
                success: true,
                message: "fetch success",
                data: result
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}