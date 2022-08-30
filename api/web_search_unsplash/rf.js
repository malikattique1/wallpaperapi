
// var a=[];
// function sss() {
//     return pool.query(
//         `select id,title,description,tags from wallpaper`,
//         [],
//         (error, results, fields) => {
//             if (error) {
//                 console.log(error);
//             }
//             // console.log("inside",results);
//             json=JSON.parse(JSON.stringify(results))
//             return triggered(json);
//         }
//         );
//     }
//     function triggered(json) {
//         // Do your work on json
//         console.log("inside",results);
//         return (a.push(json));
//     }
//     sss(a);



// var result = [];
// var  getInformationFromDB = function(callback) {
//     pool.query('select id,title,description,tags from wallpaper', function(err, res, fields)
//     {
//         if (err)  return callback(err);
//         if(res.length){
//             for(var i = 0; i<res.length; i++ ){     
//                 result.push(res[i]);
//             }
//         }
//         callback(null, result);
//     }
//     );
// }
// console.log("Call Function");
// getInformationFromDB(function (err, result) {
//     if (err) console.log("Database error!");
//     else console.log(result);
// });




// const res = new Promise((resolve, reject)=>{
//     pool.query('select id,title,description,tags from wallpaper',  (error, results)=>{
//         return resolve(results);
//     });
// });

// sequentialQueriessss ();
// async function sequentialQueriessss () {
//     const result1 = await res;
//     console.log("promisev",result1)
// }

// (async () => {
//     const result1 = await res;
//     console.log("pro",result1);
// })();


// dbdata=[1,2];
// sitedata=[1,2,3,4];
// uniqueResultss=[];
// jquery.each(sitedata, function(i, el){
//     // console.log(el['pic'])
//     if(jquery.inArray(el, dbdata) === -1) uniqueResultss.push(el);
// });
// console.log("uniquelinks",uniqueResultss);


// dbdata=["aaa","bbb"]
// sitedata=[{pic:"aaa",title:"haha"},{pic:"bbb",title:"haha2"},{pic:"ccc",title:"haha3"},{pic:"ddd",title:"haha"},{pic:"aaa",title:"haha"}]
// // dbdata=[1,2];
// // sitedata=[1,2,3,4];
// uniqueResultss=[];
// jquery.each(sitedata, function(i, el){
//     // console.log(el['pic'])
//     if(jquery.inArray(el['pic'], dbdata) === -1) uniqueResultss.push(el);
// });
// console.log("uniquelinksss",uniqueResultss);


// // var array = [0,1,null,2,"",3,'',undefined,3,,,,,,4,,4,,5,,6,,,,];
// // var filtered = uniqueResults.filter(function (el) {
// //     // return el != null;
// //     return (el != null && el != '');
// // });
// // console.log("dddddddddddddaaa",filtered);









// const arr = [{ip:1}, {ip:2}, {ip:3}, {ip:4}]
// const brr = [2, 4]
// const res = arr.filter((f) => brr.includes(f.ip))
// console.log(res)