const { eventNames } = require("../../config/database");
const pool = require("../../config/database");
const categoryController = require("../category/category.controller");
const stickerpackService = require("../stickerpack/stickerpack.service");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into wallpaper(title, description, category, thumbnail_path,thumbnail_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments) 
      values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ;
      SELECT id,name FROM tags WHERE id IN (${data.tags.join(', ')})`,
      [
        data.title,
        data.description,
        data.category,
        data.thumbnail_path,
        data.thumbnail_width,
        data.wallpaper_height,
        data.wallpaper_type,
        data.home_and_lock_paths,
        data.orientation,
        data.is_premium,
        data.is_editor_choice,
        data.privacy,
        data.author,
        data.tags.join(', '),
        // JSON.stringify(data.tags),
        data.wallpaper_size,
        data.views,
        data.downloads,
        data.likes,
        data.comments
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
    },
    getwallpaperbywallpapertype: (id, callBack) => {
      if(id==-1){
        pool.query(
          `select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
          );
        } else {
          pool.query(
            `select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = ?`,
            [id],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
            );
          }
        },
        getwallpaperbycategory: (id, callBack) => {
          if(id==-1){
            pool.query(
              `select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper`,
              [id],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results);
              }
              );
            } else {
              pool.query(
                `select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where category = ?`,
                [id],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
                  return callBack(null, results);
                }
                );
              }
            },
            getcategorybywallpaper: (id, callBack) => {
              if(id==-1){
                pool.query(
                  `select name from categories`,
                  [id],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                    return callBack(null, results);
                  }
                  );
                } else {
                  pool.query(
                    `select id,name from categories where id IN (SELECT category FROM wallpaper WHERE id = ?)`,
                    [id],
                    (error, results, fields) => {
                      if (error) {
                        callBack(error);
                      }
                      return callBack(null, results);
                    }
                    );
                  }
                },
                
                getwallpapertype: callBack => {
                  pool.query(
                    `select id,type,wallpapertype.order from wallpapertype ORDER BY wallpapertype.order ASC ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 9 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 10 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 3 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 4 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 1 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 5 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 2 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 8 ; select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 7 ;  select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper where wallpaper_type = 6`,
                    (error, results, fields) => {
                      for(var i=0; i<results[0].length; i++) {
                        customkey=results[0][i].wallpapers=[];
                        customkeyinner=results[i+1]
                        customkeyinner.forEach(myFunction)
                        function myFunction(item, index, arr) {
                          customkey.push(item)
                        }
                      }
                      // customkey=results[0][0].wallpapers=[];
                      // customkeyinner=results[1]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][1].wallpapers=[];
                      // customkeyinner=results[2]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                        
                      // }
                      
                      // customkey=results[0][2].wallpapers=[];
                      // customkeyinner=results[3]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][3].wallpapers=[];
                      // customkeyinner=results[4]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][4].wallpapers=[];
                      // customkeyinner=results[5]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][5].wallpapers=[];
                      // customkeyinner=results[6]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][6].wallpapers=[];
                      // customkeyinner=results[7]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][7].wallpapers=[];
                      // customkeyinner=results[8]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][8].wallpapers=[];
                      // customkeyinner=results[9]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      // customkey=results[0][9].wallpapers=[];
                      // customkeyinner=results[10]
                      // customkeyinner.forEach(myFunction)
                      // function myFunction(item, index, arr) {
                      //   customkey.push(item)
                      // }
                      
                      if (error) {
                        callBack(error);
                      }
                      return callBack(null, results[0]);
                    }
                    );
                  },
                  
                  getwallpapers: callBack => {
                    pool.query(
                      `select id,title,description,category,thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments,date_created,date_updated from wallpaper`,
                      [],
                      (error, results, fields) => {
                        if (error) {
                          callBack(error);
                        }
                        return callBack(null, results);
                      }
                      );
                    },
                         
                  getcategories: callBack => {
                    pool.query(
                      `select id,name,thumbnail,wallpaper_count,categories.order from categories order by categories.order ASC`,
                      [],
                      (error, results, fields) => {
                        if (error) {
                          callBack(error);
                        }
                        return callBack(null, results);
                      }
                      );
                    },
                    
                  };
                  