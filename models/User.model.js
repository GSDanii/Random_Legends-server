const { Schema, model } = require("mongoose");
const { ROLES, IRON } = require('../const/user.const');
const bcrypt = require('bcryptjs');
const SALT = +process.env.SALT;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ROLES,
      default: IRON
    },
    summonerName: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  if (this.isNew) {
    const genSalt = bcrypt.genSaltSync(SALT);
    const hashPassword = bcrypt.hashSync(this.password, genSalt);
    this.password = hashPassword;
  }
  next();
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

const UserModel = model("User", userSchema);

module.exports = UserModel;
