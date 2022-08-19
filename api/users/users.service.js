const pool = require("../../config/database");
const  search  = require("./users.router");

module.exports = {
  createuser: (data, callBack) => {
    pool.query("SELECT username FROM users WHERE Username= ?", [data.Username], function (err, rows,fields){
      if (err) throw err;
      if (rows && rows.length) {
        console.log(rows[0].Username+" already exists");
      }
      else{
        console.log('Success...');
      }
    });
    pool.query(
      `insert into users(FirstName,LastName,Username,email,password,RoleID,isPremium ) 
      values(?,?,?,?,?,?,?)`,
      [
        data.FirstName,
        data.LastName,
        data.Username,
        data.email,
        data.password,
        data.RoleID,
        data.IsPremium,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    loginuserbyemail: (email, callBack) => {
      pool.query(
        `select FirstName,LastName,Username,email,password,IsPremium from users where email = ?`,
        [
          email
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
        );
      },
    
    getuser: callBack => {
      pool.query(
        `select id, profile_pic,full_name, followers_count, followings_count, stickers_count, stickerpack_counts, email, password, username, is_premium from user`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      getuserById: (id, callBack) => {
        pool.query(
          `select id, profile_pic,full_name, followers_count, followings_count, stickers_count, stickerpack_counts, email, username, is_premium from user where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },

          updateuser: (data, callBack) => {
            pool.query(
              `update user set profile_pic=?,full_name=?, email=?, password=?, is_premium=? where username = ?`,
              [
                data.profile_pic,
                data.full_name,
                data.email,
                data.password,
                data.is_premium,
                data.username,
              ],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results[0]);
              }
              );
            },
            
            editprofilepic: (data, callBack) => {
              pool.query(
                `update user set profile_pic=? where username = ?`,
                [
                  data.profile_pic,
                  data.username
                ],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
                  return callBack(null, results[0]);
                }
                );
              },
              deleteuser: (data, callBack) => {
                pool.query(
                  `delete from user where username = ?`,
                  [data.username],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                    return callBack(null, results[0]);
                  }
                  );
                }
              };
              