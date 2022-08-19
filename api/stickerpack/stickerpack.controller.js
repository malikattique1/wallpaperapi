
var bcrypt = require('bcrypt');
var config = require('../../config.js'); // get our config file

const {
  createStickerpack,
  loginstickerpack,
  getStickerpackByCategory,
  getStickerpackByid,
  getStickerspack,
  updateStickerpack,
  deleteStickerpack
} = require("./stickerpack.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  loginstickerpack: (req, res) => {
    const body = req.body;
    loginstickerpack(body.owner, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid userid/email or password"
        });
      }
      if ((body.owner === results.owner)) {
        const jsontoken = sign({ result: results }, config.secret, {
          expiresIn: 86400
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid user_id/email or passwordsss"
        });
      }
    });
  },
  createStickerpack: (req, res) => {
    const body = req.body;
    createStickerpack(body, (err, results) => {
      // console.log(body.tray_icon);
    if (!body.tray_icon.toLowerCase().match(/\.(jpg|png|gif)/g)) {
      return res.status(500).json({
        success: 0,
        message: "Only supports jpg file format"
      });
  }
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      
      return res.status(200).json({
        success: 1,
        message: "StickerPack Created"
      });
    });
  },
  getStickerpackByCategory: (req, res) => {
    const category = req.params.category;
    getStickerpackByCategory(category, (err, results) => {
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
  getStickerpackByid: (req, res) => {
    const id = req.params.id;
    getStickerpackByid(id, (err, results) => {
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
  getStickerspack: (req, res) => {
    getStickerspack((err, results) => {
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
  updateStickerpack: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateStickerpack(body,id, (err, results) => {
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
  deleteStickerpack: (req, res) => {
    const data = req.body;
    deleteStickerpack(data, (err, results) => {
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
