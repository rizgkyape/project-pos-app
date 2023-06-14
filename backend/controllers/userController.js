const db = require("./../models");
const User = db.User;
// const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  loginAdmin: async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;

      let result;

      if (emailOrPhone.includes("@")) {
        result = await User.findOne({
          where: {
            email: emailOrPhone,
            password: password,
            isAdmin: true,
          },
        });
      } else {
        result = await User.findOne({
          where: {
            phoneNumber: emailOrPhone,
            password: password,
            isAdmin: true,
          },
        });
      }

      if (result) {
        let payload = {
          id: result.id,
          adminId: result.adminId,
          name: result.name,
          isAdmin: result.isAdmin,
        };

        const token = jwt.sign(payload, "coding-its-easy", {expiresIn: '10h'});

        return res.status(200).send({
          success: true,
          message: "Login Success",
          data: {
            id: result.id,
            adminId: result.adminId,
            name: result.name,
            isAdmin: result.isAdmin,
            token,
          },
        });
      } else {
        return res.status(404).send({
          success: false,
          message: "Wrong email/phone number or password!",
          data: {},
        });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
        data: {},
      });
    }
  },
  loginCashier: async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;

      let result;

      if (emailOrPhone.includes("@")) {
        result = await User.findOne({
          where: {
            email: emailOrPhone,
            isAdmin: false,
          },
        });
      } else {
        result = await User.findOne({
          where: {
            phoneNumber: emailOrPhone,
            isAdmin: false,
          },
        });
      }

      const isUserExist = await bcrypt.compare(password, result.password)


      if (isUserExist) {
        let payload = {
          id: result.id,
          adminId: result.adminId,
          name: result.name,
          isAdmin: result.isAdmin,
        };

        const token = jwt.sign(payload, "coding-its-easy");

        return res.status(200).send({
          success: true,
          message: "Login Success",
          data: {
            id: result.id,
            adminId: result.adminId,
            name: result.name,
            isAdmin: result.isAdmin,
            token,
          },
        });
      } else {
        return res.status(404).send({
          success: false,
          message: "Wrong email/phone number or password!",
          data: {},
        });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
        data: {},
      });
    }
  },
  createCashier: async (req, res) => {
    try {
      const { adminId, name, email, phoneNumber, password, confirmPassword } =
        req.body;

      if (
        !adminId ||
        !name ||
        !email ||
        !phoneNumber ||
        !password ||
        !confirmPassword
      ) {
        return res.status(400).send({
          success: false,
          message: "Data is Not Fully Filled!",
          data: null,
        });
      }

      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (pattern.test(password) == false) {
        return res.status(404).send({
          success: false,
          message:
            "password must be 8 characters, 1 uppercase, 1 lowercase and 1 number",
          data: null,
        });
      }
      
      if (password != confirmPassword) {
        return res.status(404).send({
          success: false,
          message: "password doesn't match",
          data: null,
        });
      }

      const checkEmail = await User.findOne({
        where: {
          email: email,
        },
      });

      if (checkEmail) {
        return res.status(400).send({
          success: false,
          message: "your email has already taken!",
          data: null,
        });
      }

      const checkPhoneNumber = await User.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });

      if (checkEmail) {
        return res.status(400).send({
          success: false,
          message: "your phone number has already taken!",
          data: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const result = await User.create({
        adminId: adminId,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashPassword,
        isAdmin: 0,
        isCashier: 1,
      });

      if (result) {
        res.status(201).send({
          success: true,
          message: "register success!",
          data: {
            adminId: adminId,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            isAdmin: 0,
          },
        });
      } else {
        return res.status(406).send({
          success: false,
          message: "register failed!",
          data: null,
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
  statusCashier: async (req, res) => {
    try {
      const { id, isCashier } = req.body;

      if (isCashier == false) {
        await User.update(
          {
            isCashier: true,
          },
          {
            where: {
              id: id,
            },
          }
        );

        const resultUpdate = await User.findOne({
          where: {
            id: id,
          },
        });

        return res.status(201).send({
          success: true,
          message: "update cashier status on success",
          data: resultUpdate,
        });
      } else {
        await User.update(
          {
            isCashier: false,
          },
          {
            where: {
              id: id,
            },
          }
        );

        const resultUpdate = await User.findOne({
          where: {
            id: id,
          },
        });

        return res.status(201).send({
          success: true,
          message: "update cashier status off success",
          data: resultUpdate,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },
  getCashierList: async (req, res) => {
    try {
      let where = undefined;
      let order = undefined;

      //pagination
      let page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 100;

      let { name, sortBy, sort } = req.query;

      if (name) {
        where = {
          name: { [Op.like]: `%${name}%` },
          isAdmin: false
        };
      }

      if (sortBy && sort) {
        order = [[`${sortBy}`, `${sort}`]];
      }

      let dataCount = await User.count({
        where: where
      });
      let pageCount = Math.ceil(dataCount / limit);

      const result = await User.findAll({
        where: where,
        limit: limit,
        offset: (page - 1) * limit
      });

      if (result) {
        return res.status(200).send({
          success: true,
          message: "fetch success",
          data: result,
          pagination: {
            page: page,
            pageCount: pageCount,
            dataCount: dataCount,
            limit: limit 
          }
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "fetch failed",
          data: null,
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
};
