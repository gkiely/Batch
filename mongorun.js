// show collections
// show dbs
// db.grant.drop()
// db.errorlogs.find({
//   _id: ObjectId("568ad159e40f2a96173af5d5")
// })
db.errorlogs.find().pretty()
// db.errorlogs.remove({})