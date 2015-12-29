
/**
 * Mongoose
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create schema
var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String
});

// Types are:
// String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array

// === Custom schema method
userSchema.methods.createNickname = function(){
  return this.nickname = this.charAt(0) + 'dawg';
};



// === Create Model ===
var User = mongoose.model('User', userSchema);

// === Create Object based on schema ===
var grant = new User({
  fname: "Grant",
  lname: "Kiely",
  email: "grant.kiely@gmail.com"
});

grant.createNickname();


// === Run a function before saving
userSchema.pre('save', function(next){
  var currentDate = new Date();
  this.updated_at = currentDate;
  if(!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

// === Save
grant.save(function(err){
  if(err) throw err;

  log('User saved successfully');
});


// === QueryAll
User.find({}, function(err, users){
  if(err) throw err;

  log(users);
});

// === findById
User.findById(1, function(err, user){
  log(user);
});


// === mongodb query syntax
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);
User.find({admin: true}).where('created_at').gt(monthAgo).exec(function(err, users){
  
});

// === Update
User.findById(1, function(err, user){
  user.location = 'aus';
  user.save();
});

// --- OR
User.findOneAndUpdate({fname: "Grant"}, {fname: 'Geebebe'}, function(err, user){
  // updated user
});

// --- OR
User.findByIdAndUpdate()


// === Delete
User.find({fname: "Grant"}, function(err, user){
  user.remove();
});

// --- OR
User.findOneAndRemove({fname: "Grant"});

// --- OR
User.findByIdAndRemove(1);