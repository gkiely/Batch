// === Show databases
// show dbs


// === Show collections
// show collections



/**
 * Create
 */

// === Create Collection
// db.createCollection('myCollection', {
//   capped: [optionalBool],
//   autoIndexID: [optionalBool],
//   size: [optionalNumber],
//   max: [optionalNumber]
// });

// === Insert / Create collection
// db.players.insert({yo: "sup"})
// db.players.insert([{obj1: "yo"}, {obj2: "sup"}])


// === Create/use db
// use mydb


/**
 * Remove
 */

// === Remove Object
// db.players.remove(
//   {"_id" : ObjectId("567696c33f5b505c44b65706")}
// )

// === Remove collection
// db.players.drop()


/**
 * Update
 */

// === Update entire object
// db.players.update(
//   {"_id" : ObjectId("567696df025dad0ef37b30d8")},
//   {
//     "fname" : "Grant",
//     "lname" : "Kiely",
//   }
// )

// === Update one property
// db.players.update(
//   {"_id": ObjectId("567696df025dad0ef37b30d8")},
//   {$set: {position: "yolo"}}
// )




/**
 * Read
 */

// === Find
// db.players.find()
// db.players.find().pretty()
// db.players.findOne()
// db.players.find({
//   position: 'Goalie'
// }).pretty()


// === 'AND' find
// db.players.find({
//   age: 21,
//   position: 'Defenseman'
// }).pretty()

// === 'OR' find
// db.players.find({
//   $or: [
//     {
//       position: "Left Wing",
//       position: "Right Wing",
//     }
//   ]
// }).pretty()

// === Greater than find
// db.players.find({
//   "age": {$gt:30}
// }).pretty()

// Can also use
// $gt, $lt, $gte, $lte, $ne (not equal)


// === Filter data returned
// db.players.find(
//   {position: 'Center'},
//   {
//     _id: 0,
//     name: 1,
//   }
// ).pretty()

// === Limit
// db.players.find({
//   position: 'Center'
// }).limit(3).pretty()

// === Skip
// db.players.find({
//   position: 'Center'
// }).skip(2).pretty()

// === Grouping data
// $avg, $sum, $max, $min
// db.users.aggregate({
//   $group: {
//     _id: "$eyeColor",
//     avgAge: {$avg: "$age"},
//     richest: {$max: "$balance"},
//     total: {$sum : 1}
//   }
// })









// Performance
// totalDocsExamined shows amount searched
// db.users.find({
//   "age": {$lt:23}
// }).explain("executionStats")

// Indexing for a large site
// Improves perf, lowers totalDocsExamined
// Note that this should only be used on areas that you are searching alot, as it increases load, you can drill down into further user data once you have the result
// db.users.ensureIndex({"age": 1})

// db.users.getIndexes()

// Drop index
// db.users.dropIndex({"age": 1})









