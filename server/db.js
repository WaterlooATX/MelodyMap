var pmongo = require("promised-mongo");
var mongodbUri = 'mongodb://MelodyMap:makersquare@ds147995.mlab.com:47995/melodymap'

// if (process.env.NODE_ENV === "production") {
//   var db = pmongo(process.env.MONGODB_URI, {
//     authMechanism: "ScramSHA1"
//   });
// } else {
//   var db = pmongo("goodnewsdb");
// }

var db = pmongo(mongodbUri, {
  authMechanism: 'ScramSHA1'
});

module.exports = db;

// // clears database
// db.deleteEverything = function () {
//   return Promise.all([db.collection("articles").remove({})])
// };
