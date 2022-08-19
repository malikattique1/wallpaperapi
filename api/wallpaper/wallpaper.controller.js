
var bcrypt = require('bcrypt');
var config = require('../../config.js'); 

const {
  create,
  getStickerByuser_id,
  getwallpaperbywallpapertype,
  getwallpaperbycategory,
  getcategorybywallpaper,
  getwallpapertype,
  getwallpapers,
  getcategories,
  
} = require("./wallpaper.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  login: (req, res) => {
    const body = req.body;
    getStickerByuser_id(body.user_id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid userid/email or password"
        });
      }
      if ((body.user_id === results.user_id)) {
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
  createwallpaper: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Wallpaper Created",
        data: results
      });
    });
  },
  getwallpaperbywallpapertype: (req, res) => {
    const id = req.params.id;
    getwallpaperbywallpapertype(id, (err, results) => {
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
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getwallpaperbycategory: (req, res) => {
    const id = req.params.id;
    getwallpaperbycategory(id, (err, results) => {
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
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getcategorybywallpaper: (req, res) => {
    const id = req.params.id;
    getcategorybywallpaper(id, (err, results) => {
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
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getwallpapertype: (req, res) => {
    getwallpapertype((err, results) => {
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
  getwallpapers: (req, res) => {
    getwallpapers((err, results) => {
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
  getcategories: (req, res) => {
    getcategories((err, results) => {
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

};
