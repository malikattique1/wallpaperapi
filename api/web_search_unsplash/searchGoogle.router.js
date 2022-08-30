
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const jsdom = require('jsdom')
const dom = new jsdom.JSDOM("")
const jquery = require('jquery')(dom.window)

const { eventNames } = require("../../config/database");
const pool = require("../../config/database");
const {
    createwallpaper,
    login,
} = require("./searchGoogle.controller.js");


const searchGoogle = require('./searchGoogle.controller.js');
router.get('/search', (request, response) => {
    const searchQuery = request.query.searchquery;
    if (searchQuery != null) {
        searchGoogle(searchQuery)
        .then(results => {
            response.status(200);
            response.json(results);
            // return
            queryPromise1 = () =>{
                return new Promise((resolve, reject)=>{
                    pool.query('select id,title,description,thumbnail_path,tags from wallpaper',  (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                        json=JSON.parse(JSON.stringify(results))
                        return resolve(json);
                    });
                });
            }
            async function sequentialQueries () {
                const resultdb = await queryPromise1();
                // console.log("promise",resultdb)
                db_data=[];
                DB=resultdb.forEach (db => {
                    db_data.push(db.thumbnail_path)
                });
                // console.log("db",db_data);
                site_data=[];
                SITE=results.forEach (figs => {
                    site_data.push(figs)
                });
                // console.log("site",site_data)
                uniqueResults=[];
                jquery.each(site_data, function(i, el){
                    if(jquery.inArray(el['pic'], db_data) === -1) uniqueResults.push(el);
                });
                // console.log("uniquelinks",uniqueResults);
                if (uniqueResults.length === 0){
                    // console.log("same");
                    return
                }else{
                    // console.log("not same")
                    uniqueResults.forEach(result => {
                        pool.query(
                            `insert into wallpaper(title, description, category, thumbnail_path,thumbnail_width,thumbnail_height,wallpaper_path,wallpaper_width,wallpaper_height,wallpaper_type,home_and_lock_paths,orientation,is_premium,is_editor_choice,privacy,author,tags,wallpaper_size,views,downloads,likes,comments) 
                            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                            [
                                `${[result.title]}`,
                                `${[result.description]}`,
                                2,
                                `${[result.thumbnail_path]}`,
                                `${[result.thumbnail_width]}`,
                                `${[result.thumbnail_height]}`,
                                `${[result.pic]}`,
                                `${[result.wallpaper_width]}`,
                                `${[result.wallpaper_height]}`,
                                2,
                                // "live wallpaper",
                                "data.home_and_lock_paths",
                                "data.orientation",
                                "data.is_premium",
                                "data.is_editor_choice",
                                // 2,
                                4,
                                4,
                                // data.tags.join(', '),
                                "JSON.stringify(data.tags)",
                                `${[result.wallpaper_size]}`,
                                `${[result.views]}`,
                                `${[result.downloads]}`,
                                "data.likes",
                                "data.comments"
                            ],
                            (error, results, fields) => {
                                if (error) {
                                    console.log(error);
                                }
                                return (null, results);
                            }
                            );
                        });
                    }
                }
                var execute= sequentialQueries();
                
            });
        } else {
            response.end();
        }
    });
    //   router.get('/search', searchGoogle);
    module.exports = router;




    
    