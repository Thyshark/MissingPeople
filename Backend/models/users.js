const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
});

// Compare hashed passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the UserModel based on the userSchema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
