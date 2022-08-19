const pool = require("../../config/database");
module.exports = {
  createStickerpack: (req, res) => {
    if (!req.tray_icon.toLowerCase().match(/\.(jpg)/g)) {
      throw new Error("Only supports jpg file format");
  }
    pool.query(
      `insert into stickerpack(name, owner, privacy, tray_icon, country, poster_icon, pack_category, is_paid) 
                values(?,?,?,?,?,?,?,?)`,
      [
        req.name,
        req.owner,
        req.privacy,
        req.tray_icon,
        req.country,
        req.poster_icon,
        req.pack_category,
        req.is_paid,
      ],
      (error, results, fields) => {
        if (error) {
          res(error);
        }
        return res(null, results);
      }
    );
  },
  getStickerpackByCategory: (category, callBack) => {
    pool.query(
      `select * from stickerpack where pack_category IN (select pack_category from stickerpack where pack_category = ?)`,
      [category],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getStickerpackByid: (id, callBack) => {
    pool.query(
      `select * from stickerpack where id =?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getStickerspack: callBack => {
    pool.query(
      `select id,name, rating, downloads, download_size, no_of_stickers, privacy, tray_icon, country, poster_icon, pack_category, is_paid from stickerpack`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  loginstickerpack: (owner, callBack) => {
    pool.query(
      `select id,no_of_stickers, privacy, tray_icon, country, poster_icon, pack_category, is_paid from stickerpack where owner = ?`,
      [owner],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  
  updateStickerpack: (data,id, callBack) => {
    pool.query(
      `update stickerpack set name=?, privacy=?, tray_icon=?, country=?, poster_icon=?, pack_category=? , is_paid=? where id = ?`,
      [
        data.name,
        data.privacy,
        data.tray_icon,
        data.country,
        data.poster_icon,
        data.pack_category,
        data.is_paid,
        // id
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteStickerpack: (data, callBack) => {
    pool.query(
      `delete from stickerpack where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
