
var bcrypt = require('bcrypt');
var config = require('../../config.js'); 
const pool = require("../../config/database");

const {
  createuser,
  loginuserbyemail,
  getuserById,
  getuser,
  updateuser,
  deleteuser,
  editprofilepic
} = require("./users.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  login: (req, res) => {
    const body = req.body;
    loginuserbyemail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      // console.log(results);
      const result = bcrypt.compareSync(body.password, results.password);
      // console.log(result);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, config.secret, {
          // expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  createuser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createuser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err.code,
          message: err.sqlMessage
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Signup successfully",
        // data: results
      });
    });
  },
  getuserById: (req, res) => {
    const id = req.params.id;
    getuserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getuser: (req, res) => {
    getuser((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateuser: (req, res) => {
    const body = req.body;
    updateuser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  editprofilepic: (req, res) => {
    const body = req.body;
    editprofilepic(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "uploaded successfully"
      });
    });
  },
  deleteuser: (req, res) => {
    const data = req.body;
    deleteuser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "deleted successfully"
      });
    });
  }
};
